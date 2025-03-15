from sentiment_model import SentimentAnalyzer, Config
from api import app
from fastapi.testclient import TestClient
import pytest

client = TestClient(app)
analyzer = SentimentAnalyzer()

def test_analyze():
    """Test sentiment analysis logic."""
    comments = ["This is great!", "Awful video", "It's fine"]
    result = analyzer.analyze(comments)
    assert sum(result.values()) == pytest.approx(100.0, 0.01)
    assert "positive" in result
    assert "negative" in result
    assert "neutral" in result

def test_api():
    """Test API endpoint."""
    payload = {"comments": ["Great!", "Bad", "Okay"]}
    response = client.post("/analyze-sentiments/", json=payload)
    assert response.status_code == 200
    result = response.json()
    assert "positive" in result
    assert "negative" in result
    assert "neutral" in result

def test_invalid_input():
    """Test API with invalid input."""
    payload = {"comments": ["a" * (Config.MAX_LENGTH + 1)]}
    response = client.post("/analyze-sentiments/", json=payload)
    assert response.status_code == 422  # Changed from 400 to 422

if __name__ == "__main__":
    pytest.main(["test.py"])