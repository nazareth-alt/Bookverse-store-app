import React from "react";

const ServicesPage = () => {
  const services = [
    {
      title: "Book Rentals",
      description: "Rent your favorite books for an affordable weekly fee.",
    },
    {
      title: "Reading Rooms",
      description: "Quiet, cozy spaces for uninterrupted reading sessions.",
    },
    {
      title: "Author Events",
      description: "Attend events and Q&A sessions with popular authors.",
    },
    {
      title: "Book Clubs",
      description: "Join our themed monthly book clubs for lively discussions.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-[#1e3a8a] mb-8">Our Services</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">
              {service.title}
            </h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
