require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

/**
 * Fetch video details
 * @param {string} videoId - The YouTube video ID
 */
async function getVideoDetails(videoId) {
    try {
        const response = await axios.get(`${BASE_URL}/videos`, {
            params: {
                part: "snippet,statistics,contentDetails, topicDetails",
                id: videoId,
                key: API_KEY,
            },
        });
        return response.data.items[0] || null;
    } catch (error) {
        console.error("Error fetching video details:", error.response?.data || error.message);
    }
}

/**
 * Fetch playlist details
 * @param {string} playlistId - The YouTube Playlist ID
 */
async function getPlaylistDetails(playlistId) {
    try {
        const response = await axios.get(`${BASE_URL}/playlists`, {
            params: {
                part: "snippet,contentDetails",
                id: playlistId,
                key: API_KEY,
            },
        });
        return response.data.items[0] || null;
    } catch (error) {
        console.error("Error fetching playlist details:", error.response?.data || error.message);
    }
}

/**
 * Fetch all videos in a playlist
 * @param {string} playlistId - The YouTube Playlist ID
 */
async function getPlaylistItems(playlistId) {
    let videos = [];
    let nextPageToken = null;

    try {
        do {
            const response = await axios.get(`${BASE_URL}/playlistItems`, {
                params: {
                    part: "snippet,contentDetails",
                    playlistId: playlistId,
                    maxResults: 50, // Maximum per request
                    pageToken: nextPageToken,
                    key: API_KEY,
                },
            });

            videos.push(
                ...response.data.items.map(item => ({
                    videoId: item.contentDetails.videoId,
                    title: item.snippet.title,
                    publishedAt: item.snippet.publishedAt,
                    description: item.snippet.description,
                    channelId: item.snippet.channelId
                }))
            );

            nextPageToken = response.data.nextPageToken; // Fetch next page if available
        } while (nextPageToken);

        return videos;
    } catch (error) {
        console.error("Error fetching playlist items:", error.response?.data || error.message);
    }
}

/**
 * Fetch channel details
 * @param {string} channelId - The YouTube Channel ID
 */
async function getChannelDetails(channelId) {
    try {
        const response = await axios.get(`${BASE_URL}/channels`, {
            params: {
                part: "snippet,statistics",
                id: channelId,
                key: API_KEY,
            },
        });
        return response.data.items[0] || null;
    } catch (error) {
        console.error("Error fetching channel details:", error.response?.data || error.message);
    }
}

/**
 * Fetch video comments
 * @param {string} videoId - The YouTube Video ID
 * @param {number} maxResults - Number of comments to fetch (default: 10)
 */
async function getVideoComments(videoId, maxResults = 10) {
    try {
        const response = await axios.get(`${BASE_URL}/commentThreads`, {
            params: {
                part: "snippet",
                videoId: videoId,
                maxResults: maxResults,
                key: API_KEY,
            },
        });

        return response.data.items.map(item => ({
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            comment: item.snippet.topLevelComment.snippet.textDisplay,
            likes: item.snippet.topLevelComment.snippet.likeCount,
            publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
        }));
    } catch (error) {
        console.error("Error fetching comments:", error.response?.data || error.message);
    }
}

/**
 * Fetch all videos of a YouTube channel
 * @param {string} channelId - The YouTube Channel ID
 */
async function getAllVideosFromChannel(channelId) {
    let videos = [];
    let nextPageToken = null;

    try {
        do {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    part: "snippet",
                    channelId: channelId,
                    maxResults: 50, // Maximum per request
                    order: "date", // Sort by newest
                    type: "video",
                    pageToken: nextPageToken,
                    key: API_KEY,
                },
            });

            videos.push(
                ...response.data.items.map(video => ({
                    videoId: video.id.videoId,
                    title: video.snippet.title,
                    publishedAt: video.snippet.publishedAt,
                }))
            );

            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        return videos;
    } catch (error) {
        console.error("Error fetching channel videos:", error.response?.data || error.message);
    }
}

/**
 * Fetch all relevant YouTube data
 * @param {string} playlistId - The YouTube Playlist ID
 */
async function fetchYouTubeData(playlistId) {
    console.log("Fetching data...");
    const playlistDetails = await getPlaylistDetails(playlistId);
    const playlistVideos = await getPlaylistItems(playlistId);

    return {
        playlistDetails,
        playlistVideos
    };
}

// Example usage
const PLAYLIST_ID = "PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR";

fetchYouTubeData(PLAYLIST_ID).then(data => {
    console.log(JSON.stringify(data, null, 2));
});
