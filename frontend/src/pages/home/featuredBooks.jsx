import React from "react";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import bestSellerSticker from "../../assets/best-seller-sticker.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import useWishlist from "../../hooks/useWishlist";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const FeaturedBooks = () => {
  const dispatch = useDispatch();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { data: books = [] } = useFetchAllBooksQuery();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const renderStars = (rating) => {
    const stars = Math.floor(rating);
    const hasRating = rating && !isNaN(rating);
    return (
      <div className="flex items-center space-x-1 text-yellow-400 mb-1">
        {Array.from({ length: hasRating ? stars : 0 }, (_, i) => (
          <span key={i}>★</span>
        ))}
        {Array.from({ length: hasRating ? 5 - stars : 5 }, (_, i) => (
          <span key={i}>☆</span>
        ))}
        {hasRating && <span className="text-sm text-gray-600">({rating})</span>}
      </div>
    );
  };

  const StickerImage = () => (
    <img
      src={bestSellerSticker}
      alt="Best Seller"
      className="absolute -top-4 -right-4 w-16 h-16 z-20"
    />
  );

  if (books.length === 0) return null;

  const mainBook = books[0];
  const sideBooks = books.slice(1, 5); // Only 4 side books

  return (
    <section className="py-16 px-6 max-w-screen-xl mx-auto" id="featured-books">
      <h2 className="text-4xl font-bold text-[#1e3a8a] mb-12 text-center">
        Featured Books
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-[#1e3a8a]">
        {/* Main Book */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-inner flex flex-col items-center text-center relative">
          <div className="relative w-full mb-4">
            <Link to={`/books/${mainBook._id}`}>
              <img
                src={getImgUrl(mainBook.bookImage)}
                alt={mainBook.title}
                className="rounded-lg shadow-2xl w-full object-contain h-80 mx-auto"
              />
            </Link>
            {mainBook.bestSeller && <StickerImage />}
            <div
              onClick={() => toggleWishlist(mainBook)}
              className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md z-10 cursor-pointer"
              title="Toggle Wishlist"
            >
              <FiHeart
                size={18}
                className={`transition-colors ${
                  isWishlisted(mainBook._id)
                    ? "fill-[#d2762d] text-[#d2762d]"
                    : "text-[#1e3a8a]"
                }`}
              />
            </div>
          </div>

          {/* Rating */}
          {renderStars(mainBook.rating || Math.floor(Math.random() * 5) + 1)}

          <h3 className="text-2xl font-semibold mb-1">{mainBook.title}</h3>
          <p className="text-gray-600 mb-1">{mainBook.author}</p>
          <p className="text-sm text-gray-500 mb-2">
            {mainBook.publishedYear || "2023"} | {mainBook.format}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {mainBook.description || "No description available."}
          </p>

          {/* Price */}
          <p className="text-lg font-bold text-[#1e3a8a] mb-4">
            ${mainBook.newPrice}
          </p>

          <button
            onClick={() => handleAddToCart(mainBook)}
            className="bg-[#d2762d] text-white px-5 py-2 rounded hover:bg-blue-900 transition"
          >
            Add to Cart
          </button>
        </div>

        {/* Side Books */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideBooks.slice(0, 4).map((book) => {
            const rating = book.rating || Math.floor(Math.random() * 5) + 1;

            return (
              <div
                key={book._id}
                className="flex items-center bg-transparent rounded-lg p-2 relative"
              >
                {/* Book Image */}
                <div className="relative w-28 h-44 shrink-0 flex items-center justify-center">
                  <Link to={`/books/${book._id}`}>
                    <img
                      src={getImgUrl(book.bookImage)}
                      alt={book.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </Link>
                  {book.bestSeller && <StickerImage />}
                  <div
                    onClick={() => toggleWishlist(book)}
                    className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md z-10 cursor-pointer"
                    title="Toggle Wishlist"
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
                </div>

                {/* Book Info */}
                <div className="ml-4 flex flex-col justify-center w-full text-[#1e3a8a]">
                  <div>
                    {renderStars(rating)}
                    <h3 className="text-lg font-semibold leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm text-gray-500">
                      {book.publishedYear || "2023"} | {book.format}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {book.description || "No description available."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#1e3a8a] font-semibold text-base">
                      ${book.newPrice}
                    </span>
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="text-sm bg-[#d2762d] text-white px-3 py-1 rounded hover:bg-blue-900 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* See More Link */}
      <div className="mt-10 text-center">
        <Link
          to="/shop"
          className="text-[#1e3a8a] hover:underline text-lg font-medium"
        >
          See more &gt;
        </Link>
      </div>
    </section>
  );
};

export default FeaturedBooks;
