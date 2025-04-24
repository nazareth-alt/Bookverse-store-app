import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { FiTrash2, FiShare2 } from "react-icons/fi";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleRemove = (book) => {
    dispatch(removeFromWishlist(book));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const handleShare = (book) => {
    const url = `https://wa.me/?text=Check out this book: ${book.title} - https://yourbookstore.com/books/${book._id}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 py-6 bg-white shadow-xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1e3a8a]">Your Wishlist</h2>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistItems.length > 0 ? (
        <>
          <ul className="space-y-6">
            {wishlistItems.map((book) => (
              <li
                key={book._id}
                className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <Link to={`/books/${book._id}`}>
                  <img
                    src={getImgUrl(book.coverImage || book.bookImage)}
                    alt={book.title}
                    className="w-40 h-52 object-cover rounded-md border"
                  />
                </Link>
                <div className="flex-1 md:ml-6 mt-4 md:mt-0 w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[#1e3a8a]">
                      {book.title}
                    </h3>
                    <span className="text-xl font-bold text-gray-700">
                      ${book.newPrice?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Author:</strong> {book.author} |{" "}
                    <strong>Category:</strong> {book.genre}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {book.description || "No description available."}
                  </p>
                  <div className="flex mt-4 space-x-4">
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="flex items-center px-4 py-2 bg-[#d2762d] text-white rounded hover:bg-[#b56426] transition"
                    >
                      <MdAddShoppingCart className="mr-2" /> Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(book)}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <FiTrash2 className="mr-2" /> Remove
                    </button>
                    <button
                      onClick={() => handleShare(book)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      <FiShare2 className="mr-2" /> Share
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Continue Shopping Button */}
          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-block bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <div className="max-w-md mx-auto flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <MdFavoriteBorder size={150} className="text-gray-300 mb-6" />
          <p className="text-base font-medium mb-4">Your wishlist is empty.</p>
          <Link
            to="/shop"
            className="inline-block bg-[#1e3a8a] text-white px-5 py-2.5 rounded-lg hover:bg-blue-900 transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

