import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../temp/avataar.png';

// const PostComponent = ({ post, onDelete }) => {
//     const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
//     const [hasLiked, setHasLiked] = useState(false);
//     const [isLiking, setIsLiking] = useState(false);
//     const [isDeleting, setIsDeleting] = useState(false);
const PostComponent = ({ post, onDelete,isLike }) => {
    
    const [user, setUser] = useState(false);
    const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();
    
    // Move user profile fetch logic inside useEffect and check user is liked or not and set hasliked
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get("token");

            if (!token) {
                navigate("/login");
                return;
            }

            // console.log('calling profile')

            try {
                const response = await axios.get("http://localhost:8181/api/v1/user/getprofile", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });


                if (response.data.success) {
                    
                    setUser(response.data.user);
                    setHasLiked(checkingLiking());
                    
                } else {
                    // toast.success("Logout Successfully!");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchUserProfile();
    }, [navigate,post.likes]);


    const checkingLiking = () => {
        if (!user || !user.id || !post.likes) return false;
        
        if(post.likes?.includes(user?.id)) {
            return true;
        }
        };

    
    // console.log(post._id)


    useEffect(() => {
        // const fetchLikes = async () => {
        //     try {
        //         const token = Cookies.get('token');
        //         if (!token) {
        //             navigate('/login');
        //             return;
        //         }

        //         const response = await axios.get(
        //             `http://localhost:8181/api/v1/posts/${post._id}/like`,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`
        //                 },
        //                 withCredentials: true
        //             }
        //         );
        //         if (response.data.success) {
        //             setLikes(response.data.likes?.length || 0);
        //             // setHasLiked(response.data.hasLiked || false);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching likes:', error);
        //     }
        // };

        setLikes(post.likes.length)
    }, [post._id, navigate,user]);
    
    useEffect(() => {
        if (onDelete && deleted) {
            onDelete(post._id);
        }
    }, [onDelete, post._id, deleted]);

                              

    // const handlePostClick = () => {
    //     console.log('Post clicked, ID:', post._id);
    //     // navigate(`/post/${post._id}`);
    // };

    const likepost = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isLiking) return;
        
        try {
            setIsLiking(true);
            const token = Cookies.get('token');
            if (!token) {
                toast.error('Please login to like posts');
                return;
            }

            const response = await axios.post(
                `http://localhost:8181/api/v1/posts/${post._id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                // Update likes count based on the new state
                const newLikesCount = hasLiked ? likes - 1 : likes + 1;
                setLikes(response.data.likes);
                setHasLiked(!hasLiked);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || 'Failed to like post');
            }
        } catch (error) {
            console.error('Error liking post:', error);
            toast.error(error.response?.data?.message || 'Error liking post');
        } finally {
            setIsLiking(false);
        }
    };


    // const AddLikecount = () =>
    // {
    //     setLikeCount(likeCount + 1);
    //     onClick={() => setLikeCount(likeCount + 1)}
    // }


    // for deletee post
    const handleDelete = async () => {
        if (isDeleting) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;
        
        try {
            setIsDeleting(true);
            const token = Cookies.get('token');
            if (!token) {
                toast.error('Please login to delete posts');
                return;
            }

            const response = await axios.delete(
                `http://localhost:8181/api/v1/posts/${post._id}/deletePost`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                toast.success('Post deleted successfully');
                setDeleted(true);
            } else {
                toast.error(response.data.message || 'Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error(error.response?.data?.message || 'Error deleting post');
        } finally {
            setIsDeleting(false);
        }
    };

    const processedTextData = post.textData.replace(/<b>([^<:]+):<\/b>/g, '<br/><b>$1:</b>');

    // const postUser = User.findone({ _id: post.createdByUser });
    // console.log(postUser)
    if (deleted) return null;
    return (
        <div className="max-w-l mx-auto my-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 cursor-pointer relative">
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                title="Delete Post"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            {/* Header */}
            <div className="flex items-center p-4">
                <img 
                    className="h-16 w-16 rounded-full object-cover mr-4" 
                  src={avatar} 
                    alt="Profile" 
                />
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">{post.PostCreaterName}</h4>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </p>
                </div>
            </div>

            {/* Post Image ka section */}
            {post.image && (
                <div className="w-full">
                    <img 
                        className="w-full object-cover max-h-96" 
                        src={post.image} 
                        alt="Post" 
                    />
                </div>
            )}

            {/* Post Text */}
            <div
                className="p-4 text-gray-800 text-base"
                dangerouslySetInnerHTML={{ __html: processedTextData }}
            />

            {/* Likes ka button */}
            <div className="px-4 pb-4 text-pink-600 font-semibold flex justify-between items-center">
               <button 
                 onClick={likepost}
                 disabled={isLiking}
                 className={`hover:text-pink-700 ${hasLiked ? 'text-pink-700' : ''} ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 {isLike}
               </button>
               <p> ❤️ {likes} </p> 
            </div>
        </div>
    );
};

export default PostComponent;