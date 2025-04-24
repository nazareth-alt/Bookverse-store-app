import React from "react";
import fav from "../../assets/fav.jpg";
import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <div className="w-full bg-[#fcf6e0] px-0 py-8">
      <div className="relative w-full max-w-screen-xl mx-auto rounded-xl overflow-hidden">
        {/* Image with slight opacity */}
        <div className="relative">
          <img
            src={fav}
            alt="Pick your favourites"
            className="w-full h-[380px] object-contain mx-auto opacity-80"
          />

          {/* Content on top of image */}
          <div className="absolute inset-0 flex items-center justify-center px-2 md:px-4">
            <div className="p-3 md:p-6 max-w-md w-full text-center">
              <h2
                className="text-lg md:text-3xl font-extrabold text-[#1e3a8a] mb-3 leading-tight"
                style={{
                  textShadow: "0 0 8px rgba(30, 58, 138, 0.4), 0 0 12px rgba(30, 58, 138, 0.2)",
                }}
              >
                Pick Your Favourites Now
              </h2>
              <Link to="/best-sellers">
                <button className="bg-[#d2762d] hover:bg-[#b56426] text-white font-bold px-5 py-2 text-sm md:text-base rounded-md transition duration-300">
                  Pick a Book
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;

























