import React from "react";
import Navbar from "../../components/Navbar";
import bannerImg from "../../assets/banner.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting with query

const Banner = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (searchTitle) queryParams.append("title", searchTitle);
    if (searchAuthor) queryParams.append("author", searchAuthor);
    if (searchYear) queryParams.append("year", searchYear);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div
      // className="relative bg-cover bg-center min-h-[100vh] flex flex-col overflow-hidden"
      className="relative bg-cover bg-center min-h-[100vh] flex flex-col overflow-visible"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#0a2540] opacity-60 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={ref}
        className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-20"
      >
        <div className="max-w-screen-2xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 text-[#0a2540] text-center md:text-left space-y-6 p-6 rounded-md
              bg-white/60 md:bg-transparent"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
              Unlock a World of Stories
            </h1>
            <p className="text-base md:text-lg max-w-md text-[#0a2540]/90 drop-shadow-md mx-auto md:mx-0">
              From heart-stopping thrillers to feel-good fiction, explore this
              week's top new releases.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="space-y-3 text-sm max-w-sm mx-auto md:mx-0 w-full"
            >
              <input
                type="text"
                name="title"
                placeholder="Write title here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2540]"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />

              <input
                type="text"
                name="author"
                placeholder="The author"
                className="w-full border-b-2 border-[#0a2540] bg-transparent py-2 focus:outline-none text-[#0a2540]"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
              />

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <select
                  name="year"
                  value={searchYear}
                  onChange={(e) => setSearchYear(e.target.value)}
                  className="w-full sm:w-1/2 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2540]"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 20 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>

                <button
                  type="submit"
                  className="w-full sm:w-1/2 bg-[#0a2540] hover:bg-[#05172c] text-white px-2 py-2 rounded-md shadow-md transition-all duration-300 text-sm"
                >
                  Search
                </button>
              </div>
            </form> 
          </motion.div>

          {/* Right Side Placeholder */}
          <div className="w-full md:w-1/2 h-[200px] md:h-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
