import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = ({ fadeOut }) => {
  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <DotLottieReact
        src="https://lottie.host/67d7d8d2-9276-4aed-82e9-41cab2652e0a/85aXdQAYP6.lottie"
        loop
        autoplay
        style={{ width: '70%', height: '70%' }}
      />
      <style jsx>{`
        .loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100%;
          background-color: #e7eaf6;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          opacity: 0;
          transform: scale(0.95);
          visibility: hidden;
          transition: opacity 1.2s ease, transform 1.2s ease, visibility 1.2s ease;
        }

        .fade-in {
          opacity: 1;
          transform: scale(1);
          visibility: visible;
        }

        .fade-out {
          opacity: 0;
          transform: scale(0.95);
          visibility: hidden;
        }

        @media (max-width: 768px) {
          .loader-container {
            height: 100vh;
          }
        }

        @media (max-width: 576px) {
          .loader-container {
            height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;