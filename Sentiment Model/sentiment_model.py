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
    SUMMARIZER_MODEL = "facebook/bart-large-cnn"
    NEUTRAL_THRESHOLD = 0.8
    MAX_LENGTH = 512
    SUMMARY_MIN_LENGTH = 100
    SUMMARY_MAX_LENGTH = 200
    SUMMARY_PROMPT = (
            "Summarize the emotions following YouTube comments in a detailed 100–200 word summary. "
            "Do NOT repeat the comments content again"
        )
    KEYWORD_MIN_FREQ = 2  

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    def __init__(self):
        self.model_name = Config.MODEL_NAME
        self.summarizer_model = Config.SUMMARIZER_MODEL
        self.neutral_threshold = Config.NEUTRAL_THRESHOLD
        try:
            self.analyzer = pipeline(
                "sentiment-analysis",
                model=self.model_name,
                device=0 if torch.cuda.is_available() else -1
            )
            self.summarizer = pipeline(
                "summarization",
                model=self.summarizer_model,
                device=0 if torch.cuda.is_available() else -1
            )
            logger.info(f"Loaded sentiment model: {self.model_name}")
            logger.info(f"Loaded summarizer model: {self.summarizer_model}")
        except Exception as e:
            logger.error(f"Model loading failed: {str(e)}")
            raise

    def preprocess_comments(self, comments: List[str]) -> List[str]:
        def clean_comment(comment: str) -> str:
            comment = re.sub(r'http\S+|www\S+|https\S+', '', comment, flags=re.MULTILINE)
            comment = re.sub(r'[^\w\s!?]', '', comment)
            return comment.lower().strip()[:Config.MAX_LENGTH]
        return [clean_comment(comment) for comment in comments]

    def extract_keywords(self, comments: List[str]) -> List[str]:
        words = " ".join(comments).split()
        word_counts = Counter(words)
        keywords = [word for word, count in word_counts.items() 
                   if count >= Config.KEYWORD_MIN_FREQ and len(word) > 3]
        return keywords[:5]  

    def analyze_themes(self, comments: List[str], sentiments: List[str]) -> Dict[str, Dict[str, float]]:
        keywords = self.extract_keywords(comments)
        theme_sentiments = {keyword: Counter() for keyword in keywords}
        
        for comment, sentiment in zip(comments, sentiments):
            for keyword in keywords:
                if keyword in comment.lower():
                    theme_sentiments[keyword][sentiment] += 1
        
        result = {}
        for keyword, counts in theme_sentiments.items():
            total = sum(counts.values())
            if total > 0:
                result[keyword] = {
                    "positive": round((counts["positive"] / total) * 100, 2),
                    "negative": round((counts["negative"] / total) * 100, 2),
                    "neutral": round((counts["neutral"] / total) * 100, 2)
                }
        return result

    def length_analysis(self, comments: List[str], sentiments: List[str]) -> Dict[str, float]:
        lengths = {"positive": [], "negative": [], "neutral": []}
        for comment, sentiment in zip(comments, sentiments):
            lengths[sentiment].append(len(comment.split()))
        
        return {
            "avg_length": round(sum(len(c.split()) for c in comments) / len(comments), 2) if comments else 0.0,
            "positive_avg": round(sum(lengths["positive"]) / len(lengths["positive"]), 2) if lengths["positive"] else 0.0,
            "negative_avg": round(sum(lengths["negative"]) / len(lengths["negative"]), 2) if lengths["negative"] else 0.0,
            "neutral_avg": round(sum(lengths["neutral"]) / len(lengths["neutral"]), 2) if lengths["neutral"] else 0.0
        }

    def top_comments(self, comments: List[str], results: List[Dict]) -> Dict[str, str]:
        positive_comments = [(c, r["score"]) for c, r in zip(comments, results) if r["label"] == "LABEL_2"]
        negative_comments = [(c, r["score"]) for c, r in zip(comments, results) if r["label"] == "LABEL_0"]
        
        top_positive = max(positive_comments, key=lambda x: x[1], default=("", 0.0))[0]
        top_negative = max(negative_comments, key=lambda x: x[1], default=("", 0.0))[0]
        
        return {
            "top_positive": top_positive,
            "top_negative": top_negative
        }

    def extract_suggestions(self, comments: List[str]) -> List[str]:
        suggestion_patterns = [
            r"could\s+(be|have|use|add|improve)\s+\w+",
            r"should\s+(be|have|add|fix)\s+\w+",
            r"needs\s+(to|more)\s+\w+",
            r"would\s+be\s+better\s+if\s+\w+"
        ]
        suggestions = []
        for comment in comments:
            for pattern in suggestion_patterns:
                match = re.search(pattern, comment.lower())
                if match:
                    suggestions.append(match.group(0))
        return suggestions[:3] 

    def summarize(self, comments: List[str]) -> str:
        if not comments:
            return "No comments to summarize."
        full_text = f"{Config.SUMMARY_PROMPT} {' '.join(comments)}"
        if len(full_text.split()) < 50:
            return f"Comments are brief: {full_text[:Config.MAX_LENGTH]}..."
        try:
            summary = self.summarizer(
                full_text,
                max_length=Config.SUMMARY_MAX_LENGTH,
                min_length=Config.SUMMARY_MIN_LENGTH,
                do_sample=False,
                truncation=True
            )[0]['summary_text']
            logger.debug(f"Generated summary: {summary}")
            return summary
        except Exception as e:
            logger.error(f"Summarization failed: {str(e)}")
            return "Unable to generate summary due to processing error."

    @lru_cache(maxsize=1000)
    def analyze_cached(self, comments_tuple: tuple) -> Dict[str, any]:
        return self.analyze(list(comments_tuple))

    def analyze(self, comments: List[str]) -> Dict[str, any]:
        if not comments:
            return {
                "sentiment_percentages": {"positive": 0.0, "negative": 0.0, "neutral": 0.0},
                "summary": "No comments to summarize.",
                "key_themes": {},
                "length_analysis": {"avg_length": 0.0, "positive_avg": 0.0, "negative_avg": 0.0, "neutral_avg": 0.0},
                "top_comments": {"top_positive": "", "top_negative": ""},
                "suggestions": []
            }

        processed_comments = self.preprocess_comments(comments)
        try:
            results = self.analyzer(
                processed_comments,
                truncation=True,
                max_length=Config.MAX_LENGTH,
                batch_size=32
            )
            logger.debug(f"Processed batch of {len(comments)} comments for sentiment")
        except Exception as e:
            logger.error(f"Sentiment analysis failed: {str(e)}")
            raise

        sentiments = [
            'neutral' if r['score'] < self.neutral_threshold else 
            'negative' if r['label'] == 'LABEL_0' else 
            'positive' if r['label'] == 'LABEL_2' else 'neutral'
            for r in results
        ]
        sentiment_counts = Counter(sentiments)
        total = len(comments)

        return {
            "sentiment_percentages": {
                "positive": round((sentiment_counts["positive"] / total) * 100, 2),
                "negative": round((sentiment_counts["negative"] / total) * 100, 2),
                "neutral": round((sentiment_counts["neutral"] / total) * 100, 2)
            },
            "summary": self.summarize(comments),
            "key_themes": self.analyze_themes(comments, sentiments),
            "length_analysis": self.length_analysis(comments, sentiments),
            "top_comments": self.top_comments(comments, results),
            "suggestions": self.extract_suggestions(comments)
        }