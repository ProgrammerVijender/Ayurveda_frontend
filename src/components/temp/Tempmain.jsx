import PlantAnalyzer from "./PlantAnalyzer"
import ProfileCard from "./ProfileCard"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { toast  } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import PostComponent from "./PostComponent"
import TrendingSection from "./TrendingSection"
// import Latestposts from "./Latestposts"
import RecommendUsers from "./RecommendUsers"
// import PlantAnalyzer from "./PlantAnalyzer"
import { motion } from "framer-motion";


const Tempmain = () => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  
    

  useEffect(() => {
    
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:8181/api/v1/user/getprofile", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures CORS is handled
    })
    .then((response) => {
      if (response.data.success) {
        toast.success("Login Successfully!");

          // rest of codes
        setUser(response.data.user);
        
      } else {
        toast.success("Logout Successfully!");
        navigate("/login");
      }
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile");
    });


    // const userki_ID = user._id;

    // postss fetching
     axios.get("http://localhost:8181/api/v1/posts/getallposts", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          // console.log("Fetched posts:", res.data.posts);
          setPosts(res.data.posts);
          // const posts = res.data.posts;
          // if (res) {
          //   const sortedPosts = res.data.posts.sort(
          //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          //   );
            // setPosts(sortedPosts);


          // console.log('postsas aree '+ res.data.posts)
          // }
        })
        .catch((err) => {
          console.error("Failed to fetch posts:", err.response?.data || err.message);
        });


        

  }, [navigate]);

  // useEffect(() => {
    
  // const fetchUsers = async () => {
  //   try {
      
  //     const response = await axios.post('http://localhost:8181/api/v1/user/othersWithPosts');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // fetchUsers();}, [navigate]);

  // useEffect(() => {
  //   if (user) {
  //     axios.get("http://localhost:8181/api/v1/posts/getallposts", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log("fetching sommmething "+res.data.likedPosts)
  //       const likedIds = res.data.likes.map(post => post._id);
  //       setLikedPostIds(likedIds);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch liked posts:", err.response?.data || err.message);
  //     });
  //   }
  // }, [user]);

  // Add new useEffect for posts changes
  
  useEffect(() => {
    if (user) {
      axios.get("http://localhost:8181/api/v1/posts/getallposts", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const likedIds = res.data.posts
          .filter(post => {
            if (!Array.isArray(post.likes)) {
              // console.log('post.likes is not an array:', post.likes);
              return false;
            }
            // console.log('Comparing post.likes:', post.likes, 'with user._id:', user._id);
            return post.likes.some(like => like.toString() === user._id.toString());
          })
          .map(post => post._id);

        // console.log("Liked posts by user:", likedIds);
        setLikedPostIds(likedIds);
        // console.log('like ids'+)
      })
      .catch((err) => {
        console.error("Failed to fetch liked posts:", err.response?.data || err.message);
      });
    }
  }, [user]);
  
  useEffect(() => {
    // This will run whenever posts array changes
    if (posts.length > 0) {
      // You can add any specific logic here when posts change
      // console.log("Posts updated:", posts.length);
    }
  }, [posts]);

  useEffect(() => {
    if (user && posts.length > 0) {
      const likedIds = posts
        .filter(post => {
          if (!Array.isArray(post.likes)) {
            return false;
          }
          return post.likes.some(
            like => like != null && user?._id && like.toString() === user._id.toString()
          );
        })
        .map(post => post._id);

      setLikedPostIds(likedIds);
    }
  }, [posts, user]);

  if (error) return <h2 className="text-red-600">{error}</h2>;
  if (!user) return <h2>Loading...</h2>;
  
  const checkLikedorNot = (post) => {
    // if (!post.likes || !Array.isArray(post.likes)) return false;
    return post.likes.includes(user.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col min-h-screen"
    >
      <div className="min-h-screen flex flex-col ">
      <header className="w-full p-4 text-green-700 bg-green-100 text-center text-2xl font-bold sticky top-0 z-20">
        Ayurveda
      </header>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden ">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-1/5 p-4 bg-gray-100 border-r flex-col ">
          {/* <button className="block w-full p-3 text-left hover:bg-gray-200">Latest Posts</button> */}
          {/* <div><Latestposts/></div> */}

          {/* <button className="block w-full p-3 text-left hover:bg-gray-200">Trending Posts</button> */}
          <div><TrendingSection/></div>
          {/* <button className="block w-full p-3 text-left hover:bg-gray-200">Notifications</button> */}
        </div>
    
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-4">Creating Posts</h1>

          <PlantAnalyzer posts={posts} setPosts={setPosts}/>
          
          {posts.map((post, index) => {
            const hasLiked = checkLikedorNot(post);
            // console.log(post._id + 'post liked or not '+hasLiked )

            return (
              <PostComponent 
                key={index} 
                post={post}  
                // userid={user.id}
                isLike={hasLiked?'❤️ Liked':'♡ Like'} 
                // isLike={hasLiked?'unlike this':'like this'}
                // onDelete={(postId) => {}
              />
            );
          })}
          
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex lg:w-1/4 p-4  sticky bg-white shadow-md border-l flex-col gap-4 ">
          <div className=" "><ProfileCard user={user}/></div>
          <RecommendUsers />
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
    </motion.div>
  )
}

export default Tempmain