import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import P from "./P.jsx";
import {  toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setUser(response.data.user);
        
      } else {
        navigate("/login");
      }
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile");
    });
  }, [navigate]);

  if (error) return <h2 className="text-red-600">{error}</h2>;
  if (!user) return <h2>Loading...</h2>;

  return (
    <div >
      <ToastContainer /> 
      <P user = {user}/>
    </div>
  );
};

export default Profile;

