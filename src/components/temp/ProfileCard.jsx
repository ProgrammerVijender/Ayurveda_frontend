import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import avatar from "./avataar.png"

const ProfileCard = ({user}) => {

    const navigate = useNavigate();

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200">
      <img
        src={avatar} 
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full object-cover"
      />
      <h2 className="text-xl font-bold mt-4">{user.fullname}</h2>
      <p className="text-brown-600 text-sm">{ user.email }</p>
      
      <button className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
      onClick={() => {
                   
                    Cookies.remove("token");
                    navigate("/login");
                  }}
                  >
        <span>&#8592;</span> Logout
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ProfileCard;
