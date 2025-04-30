import React, { useState, useMemo } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { FiHeart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  addToWishList,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import bestSellerSticker from "../../assets/best-seller-sticker.jpg";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const BookShop = () => {
  const { data = [], isLoading, isError } = useFetchAllBooksQuery();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    format: "",
  });
  const [sortOption, setSortOption] = useState("default");

  // Enrich MongoDB books data with UI-only fields
  const books = useMemo(() => {
    return data.map((book) => ({
      ...book,
      newPrice: parseFloat((Math.random() * 20 + 10).toFixed(2)),
      format: ["Hardcover", "Paperback", "eBook"][
        Math.floor(Math.random() * 3)
      ],
      bestSeller: Math.random() > 0.5,
    }));
  }, [data]);

  const genres = [...new Set(data.map((b) => b.genre))];
  const authors = [...new Set(data.map((b) => b.author))];
  const formats = ["Hardcover", "Paperback", "eBook"];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  const handleToggleWishlist = (book) => {
    const exists = wishlistItems.find((item) => item._id === book._id);
    if (exists) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishList(book));
    }
  };

  const isWishlisted = (bookId) =>
    wishlistItems.some((item) => item._id === bookId);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const filteredBooks = books
    .filter((book) => {
      const matchSearch = search
        ? book.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchGenre = filters.genre ? book.genre === filters.genre : true;
      const matchAuthor = filters.author
        ? book.author === filters.author
        : true;
      const matchFormat = filters.format
        ? book.format === filters.format
        : true;
      return matchSearch && matchGenre && matchAuthor && matchFormat;
    })
    .sort((a, b) => {
      if (sortOption === "low") return a.newPrice - b.newPrice;
      if (sortOption === "high") return b.newPrice - a.newPrice;
      return 0;
    });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching books!</p>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#0a2540]">
        Bookverse Collection
      </h1>
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 space-y-6 bg-gray-100 p-4 rounded-xl">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Books by keyword"
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none"
            />
            <div className="absolute top-2 left-2 bg-[#0a2540] p-1.5 rounded-full text-white">
              <Search size={16} />
            </div>
          </div>

          {/* Filters */}
          <FilterList
            title="Genre"
            options={genres}
            selected={filters.genre}
            onChange={(val) => handleFilterChange("genre", val)}
          />
          <FilterList
            title="Author"
            options={authors}
            selected={filters.author}
            onChange={(val) => handleFilterChange("author", val)}
          />
          <FilterList
            title="Format"
            options={formats}
            selected={filters.format}
            onChange={(val) => handleFilterChange("format", val)}
          />
        </aside>

        {/* Book grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-gray-100 text-[#0a2540] px-4 py-3 rounded-xl">
              Showing {filteredBooks.length} results
            </div>
            <div>
              <label className="mr-2 text-[#0a2540] font-medium">
                Sort by:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md p-1 text-sm"
              >
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="border border-gray-200 p-4 rounded-lg shadow-md relative group"
              >
                <button
                  onClick={() => handleToggleWishlist(book)}
                  className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-md z-10 cursor-pointer"
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
                </button>

                {book.bestSeller && (
                  <img
                    src={bestSellerSticker}
                    alt="Best Seller"
                    className="absolute -top-4 -right-4 w-16 h-16 z-20"
                  />
                )}

                <Link to={`/books/${book._id}`}>
                  <img
                    src={getImgUrl(book?.bookImage)}
                    alt={book?.title || "Book cover"}
                    className="w-full h-60 object-cover rounded mb-3"
                  />
                </Link>
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-sm text-gray-500">
                  Published: {book.yearPublished}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-semibold text-blue-900">
                    ${book.newPrice}
                  </span>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-[#0a2540] hover:bg-[#05172c] text-white px-3 py-1 rounded-md text-sm shadow-md"
                  >
                    <ShoppingCart size={16} className="inline mr-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterList = ({ title, options, selected, onChange }) => (
  <div className="pb-4 border-b border-gray-300">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    <ul className="space-y-2">
      {options.map((option) => (
        <li key={option} className="flex justify-between items-center">
          <span
            className={selected === option ? "text-blue-800 font-semibold" : ""}
          >
            {option}
          </span>
          <input
            type="checkbox"
            checked={selected === option}
            onChange={() => onChange(option)}
            className="accent-[#0a2540]"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default BookShop;
