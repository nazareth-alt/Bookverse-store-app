import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-[#1e3a8a] mb-6">About Us</h1>
      <p className="mb-6 text-gray-700">
        We are passionate about connecting readers with the books and stories
        they love. Whether it's through community events or curated collections,
        our mission is to build a vibrant community of book lovers.
      </p>

      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Our Locations</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Main Branch – 123 Book Lane, New York, NY</li>
        <li>Westside – 456 Reader St, Los Angeles, CA</li>
        <li>Online Support – Available worldwide</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Contact Us</h2>
      <p className="text-gray-700">
        Email: support@bookstore.com<br />
        Phone: +1 (123) 456-7890<br />
        Customer Support Hours: Mon–Fri, 9am–5pm
      </p>
    </div>
  );
};

export default AboutPage;
