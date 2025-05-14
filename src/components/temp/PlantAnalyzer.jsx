import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PuffLoader } from 'react-spinners';
import axios from 'axios'; // Import axios
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlantAnalyzer = ({ posts, setPosts }) => {
  // const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postCreated, setPostCreated] = useState(false);
  const [canCreatePost, setCanCreatePost] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0);

  
  useEffect(() => {
    const fetchLatestPosts = async () => {
      if (postCreated) {
        try {
          const postsResponse = await axios.get("http://localhost:8181/api/v1/posts/getallposts", {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          
          if (postsResponse.data.success) {
            setPosts(postsResponse.data.posts);
          }
        } catch (err) {
          console.error("Failed to fetch latest posts:", err);
        }
        
        // Reset states
        setShowPostOptions(false);
        setResult('');
        setFile(null);
        setPostData(null);
        setPostCreated(false);
      }
    };

    fetchLatestPosts();
  }, [postCreated, setPosts]);

  // Effect to handle cooldown timer
  useEffect(() => {
    let timer;
    if (!canCreatePost) {
      setCooldownTime(5);
      timer = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            setCanCreatePost(true);
            toast.success("You can create a new post now!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
      setCooldownTime(0);
    };
  }, [canCreatePost]);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: files => setFile(files[0])
  });

  const analyzePlant = async () => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        

        const prompt = ` tell me this plant name and its ayurvedic health benefits in 200 words`;
        

        const imagePart = {
          inlineData: {
            mimeType: file.type,
            data: base64Data
          }
        };

        // Generate content
        const response = await model.generateContent([prompt, imagePart]);
        const text = response.response.text();
        
        const formattedText = text
          .split('\n')
          .map(line => {
            const headingMatch = line.match(/^(\*{2})\s*(.+)/); // match **text
            if (headingMatch) {
              return `<h3>${headingMatch[2]}</h3>`;
            }
            // Bold words with single *
            const boldProcessed = line.replace(/\*(.*?)\*/g, '<b>$1</b>');
            return boldProcessed;
          })
          .join('\n');
        setResult(formattedText);
        setLoading(false);
        setShowPostOptions(true);
        setPostData({
          timestamp: new Date().toISOString(),
          result: formattedText,
          image: `data:${file.type};base64,${base64Data}`
        });

        console.log(postData);


      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Analysis error:', error);
      setLoading(false);
      toast.error('Failed to analyze the plant image');
    }
  };

  const handleCreatePost = async () => {
    if (!canCreatePost) {
      toast.warning(`Please wait ${cooldownTime} seconds before creating another post`);
      return;
    }

    if (!postData || !file) {
      toast.error("Post data or image is missing. Please analyze a plant image first.");
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      toast.error('User is not authenticated. Please log in again.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('textData', postData.result); 
      formData.append('image', file); 

      const response = await axios.post(
        'http://localhost:8181/api/v1/posts/createposts/',
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      );

      if (response.data && response.data.success) {
        setPostCreated(true);
        setCanCreatePost(false);
        toast.success("Post created successfully!");
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('Error creating post. Please try again.');
    }
  };

  const postCreatedMessage = postCreated && postData ? (
    <div className="post-created-message mt-4 border p-3">
      <h2>Post Created</h2>
      {/* <div dangerouslySetInnerHTML={{ __html: postData.result }} /> */}
    </div>
  ) : null;

  return (
    <div className="container flex-col ">
      <h1 className='mb-3'>Ayurvedic Plant Analyzer Tool 🌿</h1>
      
      <div {...getRootProps()} className="dropzone border p-4">
        <input {...getInputProps()} />
        {file ? (
          <div className="relative w-fit">
            <img 
              src={URL.createObjectURL(file)} 
              alt="Uploaded plant" 
              className="preview"
            />
            <button 
              onClick={() => setFile(null)} 
              className="absolute top-0 right-0 bg-white border rounded-full p-1 text-sm"
            >
              ×
            </button>
          </div>
        ) : (
          <p>Drag & drop plant image, or click to select</p>
        )}
      </div>

      {file && (
        <button 
          onClick={analyzePlant}
          disabled={loading}
          className="analyze-btn border p-3"
        >
          {loading ? <PuffLoader size={24} color="#fff" /> : 'Analyze Plant'}
        </button>
      )}

      {result && (
        <div className="result">
          <h2>Analysis Results</h2>
          <div dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      )}

      {showPostOptions && (
        <div className="post-options mt-4">
          <button 
            onClick={handleCreatePost}
            disabled={!canCreatePost}
            className={`post-btn p-2 border ${!canCreatePost ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {!canCreatePost ? `Creating Post... (${cooldownTime}s)` : 'Create Post'}
          </button>
          <button 
            onClick={() => {
              setShowPostOptions(false);
              setResult('');
            }} 
            className="cancel-btn p-2 border"
          >
            Cancel
          </button>
        </div>
      )}
      {postCreatedMessage}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PlantAnalyzer;