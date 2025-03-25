import React, { useState } from 'react';

const CommentAnalyzer = () => {
  const [videoId, setVideoId] = useState('');
  const [comments, setComments] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=YOUR_YOUTUBE_API_KEY`);
      const data = await response.json();
      const comments = data.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);
      setComments(comments);
      analyzeComments(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeComments = async (comments) => {
    try {
      const response = await fetch('http://localhost:8000/analyze-sentiments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments }),
      });
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing comments:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">YouTube Comments Analyzer</h1>
        <div className="mb-4">
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="Enter YouTube Video ID"
            className="p-2 w-full bg-gray-800 text-white border border-gray-700 rounded"
          />
        </div>
        <button
          onClick={fetchComments}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Analyzing...' : 'Analyze Comments'}
        </button>

        {analysisResult && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-bold mb-2">Sentiment Percentages</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-green-600 p-2 rounded">
                  <p>Positive: {analysisResult.sentiment_percentages.positive}%</p>
                </div>
                <div className="bg-red-600 p-2 rounded">
                  <p>Negative: {analysisResult.sentiment_percentages.negative}%</p>
                </div>
                <div className="bg-gray-600 p-2 rounded">
                  <p>Neutral: {analysisResult.sentiment_percentages.neutral}%</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">Summary</h3>
              <p className="mb-4">{analysisResult.summary}</p>

              <h3 className="text-xl font-bold mb-2">Top Comments</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-600 p-2 rounded">
                  <p>Top Positive: {analysisResult.top_comments.top_positive}</p>
                </div>
                <div className="bg-red-600 p-2 rounded">
                  <p>Top Negative: {analysisResult.top_comments.top_negative}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">Suggestions</h3>
              <ul className="list-disc list-inside">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentAnalyzer;