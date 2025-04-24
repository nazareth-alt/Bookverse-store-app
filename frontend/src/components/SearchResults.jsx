import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishlist,
} from "../redux/features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const { data: books = [] } = useFetchAllBooksQuery();

  const [commonSearches] = useState([
    "Thriller books",
    "Books by Michelle Obama",
    "New releases",
    "Books from 2018",
    "Top fiction",
  ]);

  const [questions] = useState([
    "What are the best books on self-improvement?",
    "Who wrote Atomic Habits?",
    "Books published in 2020?",
    "Fiction books like The Midnight Library?",
    "Best memoirs to read?",
  ]);

  useEffect(() => {
    if (!books.length) return;
  
    const title = searchParams.get("title")?.toLowerCase();
    const author = searchParams.get("author")?.toLowerCase();
    const year = searchParams.get("year");
    console.log("Search Param - year:", year); 
  
    const results = books.filter((book) => {
      // console.log("Searching for year:", year, "| Book year:", book.yearPublished);
    
      const matchesTitle = title
        ? book.title.toLowerCase().includes(title)
        : true;
      const matchesAuthor = author
        ? book.author.toLowerCase().includes(author)
        : true;
      const matchesYear = year
        ? new Date(book.yearPublished).getFullYear().toString() === year
        : true;
    
      return matchesTitle && matchesAuthor && matchesYear;
    });
    
  
    setFilteredBooks(results);
  }, [searchParams, books]);
  

  const toggleWishlist = (book) => {
    const isWishlisted = wishlist.some((item) => item._id === book._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishList(book));
    }
  };

  const handleAddToCart = (book) => {
    Swal.fire({
      title: "Added to Cart!",
      text: `${book.title} has been added to your cart.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {filteredBooks.length === 0 ? (
        <p className="text-gray-600">No books found. Try another search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="relative border border-gray-200 p-4 rounded-lg shadow-md bg-white"
            >
              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(book)}
                className={`absolute top-3 right-3 text-xl z-10 ${
                  wishlist.some((item) => item._id === book._id)
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
              >
                {wishlist.some((item) => item._id === book._id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <Link to={`/books/${book._id}`}>
                <img
                  src={`/books/${book.bookImage}`}
                  alt={book.title}
                  className="w-full h-60 object-cover rounded mb-3"
                />
              </Link>
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500 mt-1">
                Published: {book.yearPublished}
              </p>
              <p className="text-primary mt-2 font-semibold">
                ${book.newPrice}
              </p>

              <button
                onClick={() => handleAddToCart(book)}
                className="mt-4 w-full bg-[#0a2540] text-white py-2 rounded-md hover:bg-[#05172c] transition-all"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Common Searches</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {commonSearches.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">People also ask</h3>
        <ul className="space-y-2 text-gray-700">
          {questions.map((q, i) => (
            <li key={i} className="border-b pb-2">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
