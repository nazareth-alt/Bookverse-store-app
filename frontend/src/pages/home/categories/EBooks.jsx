import React, { useState } from "react";
import BookCard from "../../books/BookCard";
import { useFetchAllBooksQuery } from "../../../redux/features/books/booksApi";

const categories = [
  "Choose a genre",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Biography",
  "Science",
];

const EBooks = () => {
  
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const {data: books = []} = useFetchAllBooksQuery();

  
  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.genre?.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim()
        );

  return (
    <div className="py-10 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-[#1e3a8a]">E-books</h2>

      {/* Category Filter */}
      <div className="mb-10">
        <label
          htmlFor="category"
          className="block text-lg font-medium mb-2 text-gray-700"
        >
          Filter by Genre:
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#1e3a8a] focus:outline-none"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No books found for selected genre.
        </p>
      )}
    </div>
  );
};

export default EBooks;
