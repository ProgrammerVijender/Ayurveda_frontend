import React, { useState, useEffect } from 'react';

import "./index.css";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Tempmain from './components/temp/Tempmain.jsx';
import Loader from './components/Loader.js';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Loader fadeOut={!loading} />
      <div className={`app-content ${loading ? 'hidden' : 'visible'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Tempmain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;