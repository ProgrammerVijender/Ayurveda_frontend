import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import PostComponent from './PostComponent';

const TrendingSection = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Remove HTML tags and decode HTML entities
    return text.replace(/<[^>]*>/g, '');
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchTrendingPosts = async () => {
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
          
          const sortedPosts = response.data.posts.sort((a, b) => b.likes.length - a.likes.length);
          // Take top 5 trending posts
          setTrendingPosts(sortedPosts.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading trending posts...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Trending Posts</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-4 p-4">
          {trendingPosts.map((post, index) => (
            <div 
              key={post._id} 
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => openModal(post)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[50rem] max-h-[35rem] overflow-y-auto relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-2">{selectedPost.PostCreaterName}</h2>
            <p className="mb-4 text-gray-700 whitespace-pre-line">{cleanText(selectedPost.textData)}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{selectedPost.likes.length} likes</span>
              <span>{formatTimeAgo(selectedPost.createdAt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingSection;
