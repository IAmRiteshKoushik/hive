import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

function SearchByKeyword() {
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState({});
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categoryUrl = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`;
          const response = await axios.get(categoryUrl);
          const categoryMap = response.data.items.reduce((acc, item) => {
            acc[item.id] = item.snippet.title;
            return acc;
          }, {});
          setCategories(categoryMap);
        } catch (err) {
          console.error('Failed to fetch categories', err);
        }
      };
      fetchCategories();
    }, [apiKey]);
  
    const performKeywordSearch = async (query) => {
      setLoading(true);
      setError(null);
      setVideos([]);
  
      try {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=30&order=viewCount&type=video&key=${apiKey}`;
        const searchResponse = await axios.get(searchUrl);
        
        if (!searchResponse.data.items?.length) {
          setError('No videos found. Please enter a valid keyword.');
          return;
        }
  
        const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');
        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
        const videoDetailsResponse = await axios.get(videoDetailsUrl);
  
        const processedVideos = videoDetailsResponse.data.items.map(item => ({
          videoId: item.id,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          category: categories[item.snippet.categoryId] || 'Unknown',
          views: item.statistics?.viewCount || 0,
          likes: item.statistics?.likeCount || 0,
          comments: item.statistics?.commentCount || 0,
          uploadDate: item.snippet.publishedAt,
          duration: item.contentDetails?.duration || 'N/A',
          hashtags: item.snippet.tags || [],
          description: item.snippet.description || 'No description',
        }));
        
        setVideos(processedVideos);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.response?.data?.error?.message || 'Failed to fetch data. Please try a valid keyword.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = () => {
      if (!searchQuery.trim()) {
        setError('Please enter a valid keyword');
        return;
      }
      performKeywordSearch(searchQuery);
    };
  
    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
      setError(null);
    };
  
    const calculateMetrics = () => {
      if (!videos.length) return { contentVolume: 0, totalReach: 0, engagementIndex: 0, categoryDistribution: {}, topHashtags: [] };
      
      const totalReach = videos.reduce((sum, video) => sum + Number(video.views), 0);
      const engagementIndex = videos.reduce((sum, video) => sum + Number(video.likes) + Number(video.comments), 0);
  
      const categoryDistribution = {};
      const hashtagCounts = {};
  
      videos.forEach(video => {
        categoryDistribution[video.category] = (categoryDistribution[video.category] || 0) + 1;
        video.hashtags.forEach(tag => {
          hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
        });
      });
      
      const sortedHashtags = Object.entries(hashtagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(entry => entry[0]);
  
      return { contentVolume: videos.length, totalReach, engagementIndex, categoryDistribution, topHashtags: sortedHashtags };
    };
  
const metrics = calculateMetrics();
  return (
    <div className="app">
      <Header
        title="Search by Keyword"
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        loading={loading}
        placeholder="Enter keyword"
      />
      <div className="chart-container">
        <Doughnut data={{
  labels: Object.keys(metrics.categoryDistribution),
  datasets: [{
    data: Object.values(metrics.categoryDistribution),
    backgroundColor: ['#FF0000', '#282828', '#FF4500', '#C4302B', '#E62117', '#800000'],
    hoverBackgroundColor: ['#D00000', '#1E1E1E', '#FF6347', '#A52A2A', '#B22222', '#660000'],
    borderWidth: 2,
    borderColor: '#FFFFFF',
    hoverBorderColor: '#FF6347'
  }]
}} options={{
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF',
        font: {
          size: 14
        }
      }
    }
  }
}} width={400} height={400}/>
      </div>
      <MainContent videos={videos} loading={loading} error={error} metrics={metrics} />
    </div>
  );
}

function SearchByVideoId() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const isValidVideoId = (id) => /^[A-Za-z0-9_-]{11}$/.test(id);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!isValidVideoId(query)) {
      setError('Please enter a valid 11-character YouTube Video ID');
      return;
    }

    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${query}&key=${apiKey}`;
      const videoDetailsResponse = await axios.get(videoDetailsUrl);

      if (!videoDetailsResponse.data.items?.length) {
        setError('No video found. Please enter a valid YouTube Video ID.');
        return;
      }

      const processedVideos = videoDetailsResponse.data.items.map(item => ({
        videoId: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        categoryId: item.snippet.categoryId || 'N/A',
        views: item.statistics?.viewCount || 0,
        likes: item.statistics?.likeCount || 0,
        comments: item.statistics?.commentCount || 0,
        uploadDate: item.snippet.publishedAt,
        duration: item.contentDetails?.duration || 'N/A',
        description: item.snippet.description || 'No description',
      }));

      setVideos(processedVideos);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error?.message || 'Failed to fetch data. Please try a valid Video ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setError(null);
  };

  const calculateMetrics = () => {
    if (!videos.length) return { contentVolume: 0, totalReach: 0, engagementIndex: 0 };
    const totalReach = videos.reduce((sum, video) => sum + Number(video.views), 0);
    const engagementIndex = videos.reduce((sum, video) => sum + Number(video.likes) + Number(video.comments), 0);
    return { contentVolume: videos.length, totalReach, engagementIndex };
 
  };

  const metrics = calculateMetrics();

  return (
    <div className="app">
      <Header
        title="Search by Video ID"
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        loading={loading}
        placeholder="Enter 11-character YouTube Video ID"
      />
      <MainContent videos={videos} loading={loading} error={error} metrics={metrics} />
    </div>
  );
}

function ChannelAnalysis() {
  const [channelQuery, setChannelQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleSearch = async () => {
    const query = channelQuery.trim();
    if (!query) {
      setError('Please enter a valid channel name or ID');
      return;
    }

    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const channelUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&maxResults=1&key=${apiKey}`;
      const channelResponse = await axios.get(channelUrl);

      if (!channelResponse.data.items?.length) {
        setError('No channel found. Please enter a valid channel name or ID.');
        return;
      }

      const channelId = channelResponse.data.items[0].id.channelId;
      const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=30&order=date&type=video&key=${apiKey}`;
      const videosResponse = await axios.get(videosUrl);

      const videoIds = videosResponse.data.items.map(item => item.id.videoId).join(',');
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
      const videoDetailsResponse = await axios.get(videoDetailsUrl);

      const processedVideos = videoDetailsResponse.data.items.map(item => ({
        videoId: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        categoryId: item.snippet.categoryId || 'N/A',
        views: Number(item.statistics?.viewCount || 0),
        likes: Number(item.statistics?.likeCount || 0),
        comments: Number(item.statistics?.commentCount || 0),
        uploadDate: item.snippet.publishedAt,
        duration: item.contentDetails?.duration || 'N/A',
        description: item.snippet.description || 'No description',
      }));

      const sortedVideos = processedVideos.sort((a, b) => b.views - a.views).slice(0, 5);
      setVideos(sortedVideos);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error?.message || 'Failed to fetch channel data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setChannelQuery(e.target.value);
    setError(null);
  };

  return (
    <div className="app">
      <Header
        title="Channel Analysis"
        searchQuery={channelQuery}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        loading={loading}
        placeholder="Enter channel name or ID"
      />
      <ChannelAnalysisContent videos={videos} loading={loading} error={error} />
    </div>
  );
}

function PlaylistAnalysis() {
  const [playlistId, setPlaylistId] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleSearch = async () => {
    const id = playlistId.trim();
    if (!id) {
      setError('Please enter a valid YouTube Playlist ID');
      return;
    }

    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      // Fetch playlist items
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=30&key=${apiKey}`;
      console.log(playlistUrl)
      const playlistResponse = await axios.get(playlistUrl);

      if (!playlistResponse.data.items || playlistResponse.data.items.length === 0) {
        setError('No videos found in this playlist or the playlist is invalid/empty.');
        return;
      }

      const videoIds = playlistResponse.data.items
        .filter(item => item.snippet && item.snippet.resourceId && item.snippet.resourceId.videoId) // Ensure valid video items
        .map(item => item.snippet.resourceId.videoId)
        .join(',');

      if (!videoIds) {
        setError('No valid video IDs found in the playlist response.');
        return;
      }

      // Fetch video details
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
      const videoDetailsResponse = await axios.get(videoDetailsUrl);

      if (!videoDetailsResponse.data.items || videoDetailsResponse.data.items.length === 0) {
        setError('No video details retrieved. Videos may be private or deleted.');
        return;
      }

      const processedVideos = videoDetailsResponse.data.items.map(item => ({
        videoId: item.id,
        title: item.snippet?.title || 'Untitled Video',
        channel: item.snippet?.channelTitle || 'Unknown Channel',
        categoryId: item.snippet?.categoryId || 'N/A',
        views: Number(item.statistics?.viewCount || 0),
        likes: Number(item.statistics?.likeCount || 0),
        comments: Number(item.statistics?.commentCount || 0),
        uploadDate: item.snippet?.publishedAt || 'N/A',
        duration: item.contentDetails?.duration || 'N/A',
        description: item.snippet?.description || 'No description',
      }));

      const sortedVideos = processedVideos.sort((a, b) => b.views - a.views).slice(0, 5);
      setVideos(sortedVideos);
    } catch (err) {
      console.error('API Error:', err);
      setError(
        err.response?.data?.error?.message || 
        'An error occurred while fetching playlist data. Check the Playlist ID or API key.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setPlaylistId(e.target.value);
    setError(null);
  };

  return (
    <div className="app">
      <Header
        title="Playlist Analysis"
        searchQuery={playlistId}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        loading={loading}
        placeholder="Enter YouTube Playlist ID"
      />
      <PlaylistAnalysisContent videos={videos} loading={loading} error={error} />
    </div>
  );
}

function VideoComparison() {
  const [videoId1, setVideoId1] = useState('');
  const [videoId2, setVideoId2] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const isValidVideoId = (id) => /^[A-Za-z0-9_-]{11}$/.test(id);

  const handleSearch = async () => {
    const id1 = videoId1.trim();
    const id2 = videoId2.trim();

    if (!isValidVideoId(id1) || !isValidVideoId(id2)) {
      setError('Please enter two valid 11-character YouTube Video IDs');
      return;
    }

    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${id1},${id2}&key=${apiKey}`;
      const videoDetailsResponse = await axios.get(videoDetailsUrl);

      if (videoDetailsResponse.data.items.length !== 2) {
        setError('One or both video IDs are invalid. Please check and try again.');
        return;
      }

      const processedVideos = videoDetailsResponse.data.items.map(item => ({
        videoId: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        categoryId: item.snippet.categoryId || 'N/A',
        views: Number(item.statistics?.viewCount || 0),
        likes: Number(item.statistics?.likeCount || 0),
        comments: Number(item.statistics?.commentCount || 0),
        uploadDate: item.snippet.publishedAt,
        duration: item.contentDetails?.duration || 'N/A',
        description: item.snippet.description || 'No description',
      }));

      setVideos(processedVideos);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error?.message || 'Failed to fetch video data. Please try valid Video IDs.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange1 = (e) => {
    setVideoId1(e.target.value);
    setError(null);
  };

  const handleInputChange2 = (e) => {
    setVideoId2(e.target.value);
    setError(null);
  };

  return (
    <div className="app">
      <Header
        title="Video Comparison"
        searchQuery={{ videoId1, videoId2 }}
        onSearch={handleSearch}
        onInputChange={{ handleInputChange1, handleInputChange2 }}
        loading={loading}
        placeholder={['Enter first Video ID', 'Enter second Video ID']}
        isComparison={true}
      />
      <ComparisonContent videos={videos} loading={loading} error={error} />
    </div>
  );
}

function Header({ title, searchQuery, onSearch, onInputChange, loading, placeholder, isComparison = false }) {
  return (
    <header>
      <div className="header-content">
        <h1>{title}</h1>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Search by Keyword
          </NavLink>
          <NavLink to="/search-by-id" className={({ isActive }) => (isActive ? 'active' : '')}>
            Search by Video ID
          </NavLink>
          <NavLink to="/channel-analysis" className={({ isActive }) => (isActive ? 'active' : '')}>
            Channel Analysis
          </NavLink>
          <NavLink to="/playlist-analysis" className={({ isActive }) => (isActive ? 'active' : '')}>
            Playlist Analysis
          </NavLink>
          <NavLink to="/video-comparison" className={({ isActive }) => (isActive ? 'active' : '')}>
            Video Comparison
          </NavLink>
        </nav>
        <div className="search-container">
          {isComparison ? (
            <>
              <input
                type="text"
                placeholder={placeholder[0]}
                value={searchQuery.videoId1}
                onChange={onInputChange.handleInputChange1}
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              />
              <input
                type="text"
                placeholder={placeholder[1]}
                value={searchQuery.videoId2}
                onChange={onInputChange.handleInputChange2}
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              />
            </>
          ) : (
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={onInputChange}
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
          )}
          <button onClick={onSearch} disabled={loading}>
            {loading ? <div className="spinner" /> : isComparison ? 'Compare' : 'Search'}
          </button>
        </div>
      </div>
    </header>
  );
}

function formatNumber(num) {
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1).replace('.0', '')}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1).replace('.0', '')}K`;
  } else {
    return num.toLocaleString();
  }
}

function parseDurationToSeconds(duration) {
  if (!duration || typeof duration !== 'string') return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, hours, minutes, seconds] = match;
  return (parseInt(hours || 0) * 3600) + (parseInt(minutes || 0) * 60) + parseInt(seconds || 0);
}

function formatDuration(duration) {
  if (!duration || typeof duration !== 'string') return 'N/A';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'N/A';
  const [, hours, minutes, seconds] = match;
  let result = '';
  if (hours) result += `${hours}h `;
  if (minutes) result += `${minutes}m `;
  if (seconds) result += `${seconds}s`;
  return result.trim() || 'N/A';
}

function MainContent({ videos, loading, error, metrics }) {
  return (
    <main>
      {error && (
        <div className="error-message">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && videos.length > 0 && (
        <>
          <section className="metrics-panel">
            <div className="metric">
              <h3>Content Volume</h3>
              <p>{metrics.contentVolume}</p>
              <small>Videos Analyzed</small>
            </div>
            <div className="metric">
              <h3>Total Reach</h3>
              <p>{formatNumber(metrics.totalReach)}</p>
              <small>Total Views</small>
            </div>
            <div className="metric">
              <h3>Engagement</h3>
              <p>{formatNumber(metrics.engagementIndex)}</p>
              <small>Likes & Comments</small>
            </div>
          </section>

          <section className="results-grid">
            {videos.map(video => (
              <div key={video.videoId} className="video-card">
                <h4>{video.title}</h4>
                <div className="video-info">
                  <div>
                    <span>Channel</span>
                    <p>{video.channel}</p>
                  </div>
                  <div>
                    <span>Views</span>
                    <p>{Number(video.views).toLocaleString()}</p>
                  </div>
                  <div>
                    <span>Uploaded</span>
                    <p>{new Date(video.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="engagement-stats">
                  <div className="stat">
                    <span>👍</span>
                    {Number(video.likes).toLocaleString()}
                  </div>
                  <div className="stat">
                    <span>💬</span>
                    {Number(video.comments).toLocaleString()}
                  </div>
                  <div className="stat">
                    <span>⏳</span>
                    {formatDuration(video.duration)}
                  </div>
                </div>
                <a
                  href={`https://youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  Watch on YouTube ↗
                </a>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

function ChannelAnalysisContent({ videos, loading, error }) {
  if (loading || error || videos.length === 0) {
    return (
      <main>
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}
      </main>
    );
  }

  const top5Videos = videos.slice(0, 5);
  const totals = {
    totalViews: top5Videos.reduce((sum, video) => sum + video.views, 0),
    totalLikes: top5Videos.reduce((sum, video) => sum + video.likes, 0),
    totalComments: top5Videos.reduce((sum, video) => sum + video.comments, 0),
    totalDuration: top5Videos.reduce((sum, video) => sum + parseDurationToSeconds(video.duration), 0),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff' } },
      title: { display: true, color: '#ffffff', font: { size: 16 } },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatNumber(context.raw)}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#ffffff', callback: (value, index) => `Video ${index + 1}` } },
      y: { ticks: { color: '#ffffff' }, beginAtZero: true },
    },
  };

  const horizontalChartOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      y: { ticks: { color: '#ffffff', callback: (value, index) => `Video ${index + 1}` } },
      x: { ticks: { color: '#ffffff' }, beginAtZero: true },
    },
  };

  const viewsChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Views',
        data: top5Videos.map(video => video.views),
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
      },
    ],
  };

  const likesChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Likes',
        data: top5Videos.map(video => video.likes),
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
      },
    ],
  };

  const commentsChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Comments',
        data: top5Videos.map(video => video.comments),
        backgroundColor: [
          'rgba(255, 0, 0, 0.7)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(200, 0, 0, 0.7)',
          'rgba(150, 150, 150, 0.7)',
          'rgba(100, 0, 0, 0.7)',
        ],
      },
    ],
  };

  const durationChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Duration (s)',
        data: top5Videos.map(video => parseDurationToSeconds(video.duration)),
        borderColor: 'rgba(255, 0, 0, 0.7)',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <main>
      <section className="metrics-panel">
        <div className="metric">
          <h3>Total Videos</h3>
          <p>{top5Videos.length}</p>
          <small>Top 5 Analyzed</small>
        </div>
        <div className="metric">
          <h3>Total Views</h3>
          <p>{formatNumber(totals.totalViews)}</p>
          <small>Top 5 Videos</small>
        </div>
        <div className="metric">
          <h3>Total Likes</h3>
          <p>{formatNumber(totals.totalLikes)}</p>
          <small>Top 5 Videos</small>
        </div>
        <div className="metric">
          <h3>Total Comments</h3>
          <p>{formatNumber(totals.totalComments)}</p>
          <small>Top 5 Videos</small>
        </div>
      </section>

      <section className="chart-container">
        <div className="chart-item">
          <Bar data={viewsChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Views Comparison (Top 5)' } } }} />
        </div>
        <div className="chart-item">
          <Bar data={likesChartData} options={{ ...horizontalChartOptions, plugins: { ...horizontalChartOptions.plugins, title: { ...horizontalChartOptions.plugins.title, text: 'Likes Comparison (Top 5)' } } }} />
        </div>
        <div className="chart-item">
          <Doughnut data={commentsChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Comments Comparison (Top 5)' } } }} />
        </div>
        <div className="chart-item">
          <Line data={durationChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Duration Comparison (Top 5)' } } }} />
        </div>
      </section>

      <section className="results-grid">
        {top5Videos.map(video => (
          <div key={video.videoId} className="video-card">
            <h4>{video.title}</h4>
            <div className="video-info">
              <div>
                <span>Channel</span>
                <p>{video.channel}</p>
              </div>
              <div>
                <span>Views</span>
                <p>{Number(video.views).toLocaleString()}</p>
              </div>
              <div>
                <span>Uploaded</span>
                <p>{new Date(video.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="engagement-stats">
              <div className="stat">
                <span>👍</span>
                {Number(video.likes).toLocaleString()}
              </div>
              <div className="stat">
                <span>💬</span>
                {Number(video.comments).toLocaleString()}
              </div>
              <div className="stat">
                <span>⏳</span>
                {formatDuration(video.duration)}
              </div>
            </div>
            <a
              href={`https://youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              Watch on YouTube ↗
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}

function PlaylistAnalysisContent({ videos, loading, error }) {
  if (loading || error || videos.length === 0) {
    return (
      <main>
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}
      </main>
    );
  }

  const top5Videos = videos.slice(0, 5);
  const totals = {
    totalViews: top5Videos.reduce((sum, video) => sum + video.views, 0),
    totalLikes: top5Videos.reduce((sum, video) => sum + video.likes, 0),
    totalComments: top5Videos.reduce((sum, video) => sum + video.comments, 0),
    totalDuration: top5Videos.reduce((sum, video) => sum + parseDurationToSeconds(video.duration), 0),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff' } },
      title: { display: true, color: '#ffffff', font: { size: 16 } },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatNumber(context.raw)}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#ffffff', callback: (value, index) => `Video ${index + 1}` } },
      y: { ticks: { color: '#ffffff' }, beginAtZero: true },
    },
  };

  const horizontalChartOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      y: { ticks: { color: '#ffffff', callback: (value, index) => `Video ${index + 1}` } },
      x: { ticks: { color: '#ffffff' }, beginAtZero: true },
    },
  };

  const viewsChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Views',
        data: top5Videos.map(video => video.views),
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
      },
    ],
  };

  const likesChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Likes',
        data: top5Videos.map(video => video.likes),
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
      },
    ],
  };

  const commentsChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Comments',
        data: top5Videos.map(video => video.comments),
        backgroundColor: [
          'rgba(255, 0, 0, 0.7)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(200, 0, 0, 0.7)',
          'rgba(150, 150, 150, 0.7)',
          'rgba(100, 0, 0, 0.7)',
        ],
      },
    ],
  };

  const durationChartData = {
    labels: top5Videos.map((_, index) => `Video ${index + 1}`),
    datasets: [
      {
        label: 'Duration (s)',
        data: top5Videos.map(video => parseDurationToSeconds(video.duration)),
        borderColor: 'rgba(255, 0, 0, 0.7)',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <main>
      <section className="metrics-panel">
        <div className="metric">
          <h3>Total Videos</h3>
          <p>{top5Videos.length}</p>
          <small>Top 5 Analyzed</small>
        </div>
        <div className="metric">
          <h3>Total Views</h3>
          <p>{formatNumber(totals.totalViews)}</p>
          <small>Top 5 Videos</small>
        </div>
        <div className="metric">
          <h3>Total Likes</h3>
          <p>{formatNumber(totals.totalLikes)}</p>
          <small>Top 5 Videos</small>
        </div>
        <div className="metric">
          <h3>Total Comments</h3>
          <p>{formatNumber(totals.totalComments)}</p>
          <small>Top 5 Videos</small>
        </div>
      </section>

      <section className="chart-container">
        <div className="chart-item">
          <Bar data={viewsChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Views Comparison (Top 5)' } } }} />
        </div>
        <div className="chart-item">
          <Bar data={likesChartData} options={{ ...horizontalChartOptions, plugins: { ...horizontalChartOptions.plugins, title: { ...horizontalChartOptions.plugins.title, text: 'Likes Comparison (Top 5)' } } }} />
        </div>
        <div className="chart-item">
          <Doughnut data={commentsChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Comments Comparison (Top 5)' } } }} />
        </div>
        <div className="chart-item">
          <Line data={durationChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Duration Comparison (Top 5)' } } }} />
        </div>
      </section>

      <section className="results-grid">
        {top5Videos.map(video => (
          <div key={video.videoId} className="video-card">
            <h4>{video.title}</h4>
            <div className="video-info">
              <div>
                <span>Channel</span>
                <p>{video.channel}</p>
              </div>
              <div>
                <span>Views</span>
                <p>{Number(video.views).toLocaleString()}</p>
              </div>
              <div>
                <span>Uploaded</span>
                <p>{new Date(video.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="engagement-stats">
              <div className="stat">
                <span>👍</span>
                {Number(video.likes).toLocaleString()}
              </div>
              <div className="stat">
                <span>💬</span>
                {Number(video.comments).toLocaleString()}
              </div>
              <div className="stat">
                <span>⏳</span>
                {formatDuration(video.duration)}
              </div>
            </div>
            <a
              href={`https://youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              Watch on YouTube ↗
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}

function ComparisonContent({ videos, loading, error }) {
  if (loading || error || videos.length !== 2) {
    return (
      <main>
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}
      </main>
    );
  }

  const [video1, video2] = videos;
  const differences = {
    viewsDiff: video1.views - video2.views,
    likesDiff: video1.likes - video2.likes,
    commentsDiff: video1.comments - video2.comments,
    watchTimeDiff: parseDurationToSeconds(video1.duration) - parseDurationToSeconds(video2.duration),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff' } },
      title: { display: true, color: '#ffffff', font: { size: 16 } },
    },
    scales: {
      x: { ticks: { color: '#ffffff' } },
      y: { ticks: { color: '#ffffff' }, beginAtZero: true },
    },
  };

  const viewsChartData = {
    labels: ['Views'],
    datasets: [
      { label: 'Video 1', data: [video1.views], backgroundColor: 'rgba(255, 0, 0, 0.7)' },
      { label: 'Video 2', data: [video2.views], backgroundColor: 'rgba(255, 255, 255, 0.7)' },
    ],
  };

  const likesChartData = {
    labels: ['Likes'],
    datasets: [
      { label: 'Video 1', data: [video1.likes], backgroundColor: 'rgba(255, 0, 0, 0.7)' },
      { label: 'Video 2', data: [video2.likes], backgroundColor: 'rgba(255, 255, 255, 0.7)' },
    ],
  };

  const commentsChartData = {
    labels: ['Comments'],
    datasets: [
      { label: 'Video 1', data: [video1.comments], backgroundColor: 'rgba(255, 0, 0, 0.7)' },
      { label: 'Video 2', data: [video2.comments], backgroundColor: 'rgba(255, 255, 255, 0.7)' },
    ],
  };

  const durationChartData = {
    labels: ['Duration (s)'],
    datasets: [
      { label: 'Video 1', data: [parseDurationToSeconds(video1.duration)], backgroundColor: 'rgba(255, 0, 0, 0.7)' },
      { label: 'Video 2', data: [parseDurationToSeconds(video2.duration)], backgroundColor: 'rgba(255, 255, 255, 0.7)' },
    ],
  };

  return (
    <main>
      <section className="comparison-panel">
        {videos.map((video, index) => (
          <div key={video.videoId} className="comparison-card">
            <h2>{index === 0 ? 'Video 1' : 'Video 2'}</h2>
            <h4>{video.title}</h4>
            <div className="video-info">
              <div><span>Channel</span><p>{video.channel}</p></div>
              <div><span>Views</span><p>{formatNumber(video.views)}</p></div>
              <div><span>Likes</span><p>{formatNumber(video.likes)}</p></div>
              <div><span>Comments</span><p>{formatNumber(video.comments)}</p></div>
              <div><span>Duration</span><p>{formatDuration(video.duration)}</p></div>
              <div><span>Uploaded</span><p>{new Date(video.uploadDate).toLocaleDateString()}</p></div>
            </div>
            <a href={`https://youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="video-link">
              Watch on YouTube ↗
            </a>
          </div>
        ))}
      </section>

      <section className="chart-container">
        <div className="chart-item">
          <Bar data={viewsChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Views Comparison' } } }} />
        </div>
        <div className="chart-item">
          <Bar data={likesChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Likes Comparison' } } }} />
        </div>
        <div className="chart-item">
          <Bar data={commentsChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Comments Comparison' } } }} />
        </div>
        <div className="chart-item">
          <Bar data={durationChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Duration Comparison' } } }} />
        </div>
      </section>

      <section className="metrics-panel">
        <div className="metric">
          <h3>Views Difference</h3>
          <p>{formatNumber(Math.abs(differences.viewsDiff))}</p>
          <small>{differences.viewsDiff >= 0 ? 'Video 1 leads' : 'Video 2 leads'}</small>
        </div>
        <div className="metric">
          <h3>Likes Difference</h3>
          <p>{formatNumber(Math.abs(differences.likesDiff))}</p>
          <small>{differences.likesDiff >= 0 ? 'Video 1 leads' : 'Video 2 leads'}</small>
        </div>
        <div className="metric">
          <h3>Comments Difference</h3>
          <p>{formatNumber(Math.abs(differences.commentsDiff))}</p>
          <small>{differences.commentsDiff >= 0 ? 'Video 1 leads' : 'Video 2 leads'}</small>
        </div>
        <div className="metric">
          <h3>Watch Time Difference</h3>
          <p>{Math.abs(differences.watchTimeDiff)}s</p>
          <small>{differences.watchTimeDiff >= 0 ? 'Video 1 leads' : 'Video 2 leads'}</small>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchByKeyword />} />
        <Route path="/search-by-id" element={<SearchByVideoId />} />
        <Route path="/channel-analysis" element={<ChannelAnalysis />} />
        <Route path="/playlist-analysis" element={<PlaylistAnalysis />} />
        <Route path="/video-comparison" element={<VideoComparison />} />
      </Routes>
    </Router>
  );
}

export default App;