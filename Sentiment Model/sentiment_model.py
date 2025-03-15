from transformers import pipeline
import torch
from typing import List, Dict
from collections import Counter
import re
import logging
from functools import lru_cache

# Configuration
class Config:
    MODEL_NAME = "cardiffnlp/twitter-roberta-base-sentiment"
    NEUTRAL_THRESHOLD = 0.8
    MAX_LENGTH = 512

# Setup basic logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    def __init__(self):
        """Initialize the sentiment analysis pipeline."""
        self.model_name = Config.MODEL_NAME
        self.neutral_threshold = Config.NEUTRAL_THRESHOLD
        try:
            self.analyzer = pipeline(
                "sentiment-analysis",
                model=self.model_name,
                device=0 if torch.cuda.is_available() else -1
            )
            logger.info(f"Loaded model: {self.model_name}")
        except Exception as e:
            logger.error(f"Model loading failed: {str(e)}")
            raise

    def preprocess_comments(self, comments: List[str]) -> List[str]:
        """Preprocess a batch of comments efficiently.

        Args:
            comments (List[str]): List of raw comments.

        Returns:
            List[str]: Preprocessed comments.
        """
        def clean_comment(comment: str) -> str:
            comment = re.sub(r'http\S+|www\S+|https\S+', '', comment, flags=re.MULTILINE)
            comment = re.sub(r'[^\w\s!?]', '', comment)
            return comment.lower().strip()[:Config.MAX_LENGTH]
        
        return [clean_comment(comment) for comment in comments]

    @lru_cache(maxsize=1000)
    def analyze_cached(self, comments_tuple: tuple) -> Dict[str, float]:
        """Cached version of analyze for identical inputs."""
        return self.analyze(list(comments_tuple))

    def analyze(self, comments: List[str]) -> Dict[str, float]:
        """Analyze sentiments of comments and return percentages.

        Args:
            comments (List[str]): List of comments to analyze.

        Returns:
            Dict[str, float]: Sentiment percentages (positive, negative, neutral).
        """
        if not comments:
            return {"positive": 0.0, "negative": 0.0, "neutral": 0.0}

        processed_comments = self.preprocess_comments(comments)
        try:
            results = self.analyzer(
                processed_comments,
                truncation=True,
                max_length=Config.MAX_LENGTH,
                batch_size=32
            )
            logger.debug(f"Processed batch of {len(comments)} comments")
        except Exception as e:
            logger.error(f"Analysis failed: {str(e)}")
            raise

        sentiment_counts = Counter(
            'neutral' if score < self.neutral_threshold else 
            'negative' if label == 'LABEL_0' else 
            'positive' if label == 'LABEL_2' else 'neutral'
            for label, score in ((r['label'], r['score']) for r in results)
        )

        total = len(comments)
        sentiment_percentages = {
            'positive': (sentiment_counts['positive'] / total) * 100,
            'negative': (sentiment_counts['negative'] / total) * 100,
            'neutral': (sentiment_counts['neutral'] / total) * 100
        }
        return {k: round(v, 2) for k, v in sentiment_percentages.items()}