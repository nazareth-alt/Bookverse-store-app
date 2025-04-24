import React from "react";
import { FiHeart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  addToWishList,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import bestSellerSticker from "../../assets/best-seller-sticker.jpg";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isWishlisted = (bookId) =>
    wishlistItems.some((item) => item._id === bookId);

  const handleWishlistClick = () => {
    if (isWishlisted(book._id)) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishList(book));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const rating = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow duration-300 h-full relative">
      {/* Wishlist Button */}
      <div
        onClick={handleWishlistClick}
        className="absolute top-2 left-2 bg-white rounded-full p-1 cursor-pointer shadow-md z-10"
        title={isWishlisted(book._id) ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <FiHeart
          size={18}
          className={`transition-colors ${
            isWishlisted(book._id)
              ? "fill-[#d2762d] text-[#d2762d]"
              : "text-[#1e3a8a]"
          }`}
        />
      </div>

      {/* Best Seller Sticker */}
      {book.bestSeller && (
        <img
          src={bestSellerSticker}
          alt="Best Seller"
          className="absolute -top-4 -right-4 w-16 h-16 z-20"
        />
      )}

      {/* Book Image */}
      <div className="w-full h-64 overflow-hidden rounded-md border mb-4">
        <Link to={`/books/${book._id}`}>
          <img
            src={getImgUrl(book?.bookImage)}
            alt={book?.title || "Book cover"}
            className="w-full h-full object-cover"
            
          />
        </Link>
      </div>


      {/* Book Info */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-lg font-semibold hover:text-primary mb-1">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm mb-1">By {book?.author}</p>
          <div className="flex items-center gap-1 text-yellow-400">
            {Array.from({ length: rating }).map((_, idx) => (
              <AiFillStar key={idx} size={16} />
            ))}
            <span className="text-xs text-gray-600 ml-1">({rating})</span>
          </div>
        </div>

        <div className="text-right flex flex-col justify-between items-end min-w-[110px]">
          <div>
            <p className="text-lg font-bold text-gray-800">
              ${book?.newPrice?.toFixed(2)}
            </p>
            {book?.oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                ${book?.oldPrice?.toFixed(2)}
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-2 bg-[#d2762d] hover:bg-[#b56426] text-white text-sm px-4 py-2 rounded-md shadow w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;


