import React from 'react';
import { FaBook } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-40 h-40 animate-spin-slow">
        {[...Array(6)].map((_, i) => (
          <FaBook
            key={i}
            className="absolute text-blue-900 text-2xl"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translate(70px) rotate(-${i * 60}deg)`
            }}
          />
        ))}
      </div>

      <style jsx="true">{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;




