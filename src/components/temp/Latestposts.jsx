import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Latestposts = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const cleanText = (text) => {
    return text.replace(/<[^>]*>/g, '');
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return;
        const response = await axios.get('http://localhost:8181/api/v1/posts/getallposts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        if (response.data.success) {
          // Sort posts by createdAt descending (newest first)
          const sortedPosts = response.data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLatestPosts(sortedPosts.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading latest posts...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Latest Posts</h2>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-4 p-4">
          {latestPosts.map((post, index) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {post.likes.length} likes
                </span>
              </div>
              <p className="text-gray-800 line-clamp-2">{cleanText(post.textData)}</p>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                <span>by {post.PostCreaterName}</span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTimeAgo(post.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Latestposts;
