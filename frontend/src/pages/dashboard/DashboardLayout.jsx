import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="flex min-h-screen md:bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:flex sm:flex-col bg-[#1e3a8a] text-white sm:w-64 w-full absolute sm:static z-50`}
      >
        <a
          href="/"
          className="inline-flex items-center justify-center h-20 w-20 bg-[#1e3a8a] hover:bg-blue-800 focus:bg-blue-800"
        >
          <img src="/favicon.png" alt="Logo" />
        </a>
        <div className="flex-grow flex flex-col justify-between">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center py-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg"
            >
              <span className="sr-only">Shop</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center py-3 text-[#1e3a8a] bg-white rounded-lg"
            >
              <span className="sr-only">Dashboard</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </Link>
            <Link
              to="/dashboard/add-new-book"
              className="inline-flex items-center justify-center py-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg"
            >
              <span className="sr-only">Add Book</span>
              <HiViewGridAdd className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/manage-books"
              className="inline-flex items-center justify-center py-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg"
            >
              <span className="sr-only">Manage Books</span>
              <MdOutlineManageHistory className="h-6 w-6" />
            </Link>
          </nav>
          <button
            onClick={handleLogout}
            className="p-3 hover:text-blue-200 hover:bg-red-600 focus:text-blue-200 focus:bg-red-600 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow text-gray-800">
        <header className="flex items-center justify-between h-20 px-6 sm:px-10 bg-white">
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
          <h1 className="text-xl font-bold">Dashboard</h1>
        </header>
        <main className="p-6 sm:p-10">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;