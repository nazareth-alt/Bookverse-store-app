import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden sm:flex sm:flex-col">
        <a
          href="/"
          className="inline-flex items-center justify-center h-20 w-20 bg-[#1e3a8a] hover:bg-blue-800 focus:bg-blue-800"
        >
          <img src="/favicon.png" alt="Logo" />
        </a>
        <div className="flex-grow flex flex-col justify-between text-white bg-[#1e3a8a]">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-blue-900">
            <button className="p-3 hover:text-blue-200 hover:bg-blue-900 focus:text-blue-200 focus:bg-blue-900 rounded-lg">
              <span className="sr-only">Settings</span>
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
          <button className="block sm:hidden p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-full">
            <span className="sr-only">Menu</span>
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="relative w-full max-w-md">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
            />
          </div>
          <div className="flex items-center ml-auto space-x-4 relative">
            <div className="flex items-center space-x-2">
              <div className="text-right hidden md:block">
                <div className="font-semibold">Pearl Mor</div>
                <div className="text-sm text-gray-600">Lecturer</div>
              </div>
              <img
                src="https://i.pinimg.com/736x/c7/33/b3/c733b3fe494dc677afd8864339d6e14d.jpg"
                className="h-10 w-10 md:h-10 md:w-10 sm:h-8 sm:w-8 rounded-full object-cover"
                alt="Profile"
              />
            </div>

            <div className="relative">
              <Link to="/events">
                <button
                  className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full relative"
                  aria-label="Notifications"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full"
              aria-label="Log out"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1e3a8a]">Dashboard</h1>
              <p className="text-gray-600">BookVerse Inventory</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                to="/dashboard/manage-books"
                className="inline-flex items-center px-5 py-3 text-[#1e3a8a] hover:text-white border border-[#1e3a8a] hover:bg-[#1e3a8a] rounded-md transition"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Manage Books
              </Link>

              <Link
                to="/dashboard/add-new-book"
                className="inline-flex items-center px-5 py-3 text-white bg-[#1e3a8a] hover:bg-blue-900 rounded-md transition"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Book
              </Link>
            </div>
          </div>

          {/* Nested Route Content */}
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
