import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error loading book info.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 items-start">
      {/* Book Image */}
      <div className="w-full md:w-1/3">
        <img
          src={
            book.bookImage ? getImgUrl(book.bookImage) : "/books/default.jpg"
          }
          alt={book.title}
          className="w-full h-auto object-cover rounded shadow"
        />
      </div>

      {/* Book Info */}
      <div className="w-full md:w-2/3 space-y-4">
        <h1 className="text-3xl font-bold text-[#1e3a8a]">{book.title}</h1>

        <p>
          <strong className="text-[#1e3a8a]">Author:</strong>{" "}
          {book.author || "admin"}
        </p>
        <p>
          <strong className="text-[#1e3a8a]">ISBN:</strong> {book.ISBN || "N/A"}
        </p>
        <p>
          <strong className="text-[#1e3a8a]">Genre:</strong> {book.genre}
        </p>
        <p>
          <strong className="text-[#1e3a8a]">Year Published:</strong>{" "}
          {book.yearPublished}
        </p>
        <p>
          <strong className="text-[#1e3a8a]">Stock Available:</strong>{" "}
          {book.stock}
        </p>

        <div>
          <p className="text-lg font-medium text-[#1e3a8a]">
            ${book.newPrice?.toFixed(2)}
            {book.oldPrice && (
              <span className="line-through ml-2 text-gray-500 text-sm">
                ${book.oldPrice.toFixed(2)}
              </span>
            )}
          </p>
        </div>

        <div>
          <p className="text-gray-700 mt-2">
            {book.description || "No description available."}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="mt-4 inline-flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-2 rounded hover:bg-[#2c4696] transition"
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
