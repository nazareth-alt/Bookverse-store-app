import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory, MdNotifications } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePieChart } from "react-icons/ai";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="flex min-h-screen md:bg-gray-100">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:flex sm:flex-col bg-[#1e3a8a] text-white sm:w-64 w-full absolute sm:static z-50`}
      >
        {/* Logo Container */}
        <div className="flex items-center justify-center h-32 bg-[#1e3a8a] border-b border-blue-900">
          <img src="/favicon.png" alt="Logo" className="h-16 w-16" />
        </div>

        {/* Navigation Links */}
        <div className="flex-grow flex flex-col justify-between">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center py-3 text-[#1e3a8a] bg-white rounded-lg"
            >
              <IoMdArrowBack className="h-6 w-6" />
              <span className="ml-2">Back</span>
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center py-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg"
            >
              <AiOutlinePieChart className="h-6 w-6" />
              <span className="ml-2">Dashboard</span>
            </Link>
            <Link
              to="/dashboard/add-new-book"
              className="inline-flex items-center justify-center py-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg"
            >
              <HiViewGridAdd className="h-6 w-6" />
              <span className="ml-2">Add Book</span>
            </Link>
            <Link
              to="/dashboard/manage-books"
              className="inline-flex items-center justify-center py-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg"
            >
              <MdOutlineManageHistory className="h-6 w-6" />
              <span className="ml-2">Manage Books</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-3 hover:text-blue-200 hover:bg-red-600 focus:text-blue-200 focus:bg-red-600 rounded-lg mx-4"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow text-gray-800">
        <header className="flex items-center justify-between h-20 px-6 sm:px-10 bg-white border-b">
          {/* Menu Button */}
          <button
            className="sm:hidden p-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Admin Info */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-3"
            >
              <MdNotifications className="h-6 w-6 text-gray-500" />
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-700">Notifications</h2>
                </div>
                <ul className="p-4">
                  <li className="text-gray-600">Event 1: Book Fair</li>
                  <li className="text-gray-600">Event 2: Author Meetup</li>
                  <li className="text-gray-600">Event 3: Writing Workshop</li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="p-6 sm:p-10">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;