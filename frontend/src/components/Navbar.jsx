import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";

import avatarImg from "../assets/avataaars.png";
import bookIcon from "../assets/book-icon.png";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const wishlistItems =
    useSelector((state) => state.wishlist.wishlistItems) || [];
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const token = localStorage.getItem("token");

  return (
    <header className="max-w-screen-2xl mx-auto px-6 py-6 relative">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 relative">
          <Link to="/" className="inline-flex items-center gap-2 relative">
            <span className="text-2xl font-bold glow relative z-10">
              Bookverse
            </span>
            <img
              src={bookIcon}
              alt="Book Icon"
              className="w-6 h-6 glow relative z-10"
            />
            <span className="absolute w-2 h-2 bg-yellow-300 rounded-full top-0 left-4 animate-ping z-0" />
            <span className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full top-1 left-12 animate-ping z-0" />
            <span className="absolute w-1 h-1 bg-pink-400 rounded-full bottom-1 left-1 animate-ping z-0" />
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Nav links - Desktop */}
        <div className="hidden sm:flex justify-center items-center gap-8 text-sm font-medium">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-[#1e3a8a] text-[#1e3a8a]"
                : "hover:underline"
            }
          >
            Book Shop
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-[#1e3a8a] text-[#1e3a8a]"
                : "hover:underline"
            }
          >
            Events
          </NavLink>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 relative">
          <div
            className="relative flex items-center md:space-x-3 space-x-2"
            ref={dropdownRef}
          >
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className="size-7 rounded-full ring-2 ring-blue-500"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-40 border border-gray-200">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6 text-gray-700 hover:text-[#1e3a8a] transition" />
              </Link>
            )}
          </div>

          <Link
            to="/wishlistPage"
            className="relative text-[#1e3a8a] hover:text-[#d2762d] transition"
          >
            <HiOutlineHeart className="text-2xl" />
            <span className="absolute -top-1 -right-2 bg-[#d2762d] text-white text-xs font-bold rounded-full px-1.5">
              {wishlistItems.length || 0}
            </span>
          </Link>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length || 0}
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 space-y-3 text-sm font-medium text-center">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "block text-[#1e3a8a] font-semibold border-b-2 border-[#1e3a8a]"
                : "block hover:underline"
            }
            onClick={() => setMenuOpen(false)}
          >
            Book Shop
          </NavLink>
          <NavLink
            to="/details"
            className={({ isActive }) =>
              isActive
                ? "block text-[#1e3a8a] font-semibold border-b-2 border-[#1e3a8a]"
                : "block hover:underline"
            }
            onClick={() => setMenuOpen(false)}
          >
            Book Details
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "block text-[#1e3a8a] font-semibold border-b-2 border-[#1e3a8a]"
                : "block hover:underline"
            }
            onClick={() => setMenuOpen(false)}
          >
            Events
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
