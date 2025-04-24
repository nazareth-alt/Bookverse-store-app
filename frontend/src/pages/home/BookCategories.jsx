import React from "react";
import { Link } from "react-router-dom";

// Book cover images //
import cover1 from "../../assets/book1.jpg";
import cover2 from "../../assets/book2.jpg";
import cover3 from "../../assets/book3.jpg";
import cover4 from "../../assets/book4.jpg";
import cover5 from "../../assets/book5.jpg";
import cover6 from "../../assets/book6.jpg";

const categories = [
  { title: "Best Seller", image: cover1, path: "/best-sellers" },
  { title: "New Release", image: cover2, path: "/new-release" },
  { title: "Coming Soon", image: cover3, path: "/coming-soon" },
  { title: "Audio Books", image: cover4, path: "/audio-books" },
  { title: "E-books", image: cover5, path: "/e-books" },
  { title: "Sales", image: cover6, path: "/sales" },
];

const BookCategories = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative bg-[#0a2540] rounded-xl shadow-lg text-white text-center pt-20 pb-6 px-3 transition-transform duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-2xl"
            style={{ minHeight: "200px" }}
          >
            {/* Overlapping Book Cover */}
            <img
              src={cat.image}
              alt={cat.title}
              className="w-20 h-28 object-cover rounded-md absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-md ring-2 ring-white"
            />

            {/* Card Content */}
            <h2 className="text-base font-semibold mb-3 mt-2">{cat.title}</h2>
            <Link
              to={cat.path}
              className="text-[#d2762d] text-sm font-medium hover:underline transition-all"
            >
              more &gt;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
