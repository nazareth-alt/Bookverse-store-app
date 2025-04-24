import React from "react";

const eventCategories = [
  "Book Reading",
  "Book Review",
  "Bazaar",
  "Book Signing",
  "Join Club",
];

const latestPosts = [
    {
      title: "Reading with Local Authors",
      image:
        "https://media.istockphoto.com/id/1162698015/photo/reading-at-a-book-group-meeting.jpg?s=612x612&w=0&k=20&c=-zc2YSOiMmLGLcNBGFd-lZdIbNz-nxhQARbyo924M54=",
      link: "https://www.eventbrite.com/e/reading-with-local-authors-tickets-1261147218279?aff=ebdssbdestsearch",
    },
    {
      title: "Children's Book Fair Highlights",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmAAlvMoaeVIVuDE-jYeOUpRZvFiD4X6iP4w&s",
      link: "https://www.bolognachildrensbookfair.com/en/events/event-highlights/12700.html",
    },
    {
      title: "Fiction Friday Club Recap",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=80&h=80&q=80",
      link: "https://www.eventbrite.ca/e/fiction-fridays-fiction-nightclub-ladies-free-390-booths-tickets-645125085497",
    },
  ];
  

const popularTags = [
  "Book Signing",
  "Reading",
  "Author",
  "Signing",
  "Book",
  "Meet & Greet",
  "Club",
];

const events = [
  {
    image:
      "https://www.tckpublishing.com/wp-content/uploads/2016/11/Moravian-Book-Signing-2.jpg",
    date: "May 10, 2025",
    subject: "Book Signing with John Doe",
    summary:
      "Meet bestselling author John Doe for a signing session and Q&A on his latest mystery novel.",
  },
  {
    image:
      "https://images.stockcake.com/public/b/2/c/b2cdff6c-70c6-4f83-bb50-40b4c69e8524_large/outdoor-book-fair-stockcake.jpg",
    date: "May 12, 2025",
    subject: "Outdoor Book Bazaar",
    summary:
      "Join us for a vibrant outdoor book bazaar featuring local publishers, rare finds, and food stalls.",
  },
  {
    image:
      "https://media.istockphoto.com/id/484794664/photo/teacher-reading-a-book-with-a-class-of-preschool-children.jpg?s=612x612&w=0&k=20&c=S7EbCoLHcbvLkPuT2K-dTLKpShDR7yijuuHp-vXLef0=",
    date: "May 15, 2025",
    subject: "Children's Reading Circle",
    summary:
      "A cozy reading event for children aged 5-10, featuring animated storytelling and fun activities.",
  },
  {
    image:
      "https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6InNlcnZpY2VzL3BpY3R1cmVzL21lZGl1bS81OTI1NzYvMTUxNzEyNTM5Nl9ibG9iIiwiZWRpdHMiOnt9fQ==",
    date: "May 17, 2025",
    subject: "Author Meet & Greet",
    summary:
      "Meet your favorite authors, ask questions, and get your books signed at this exclusive event.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIM9kxus1_4Anw1Clh_QKa-wjvXZYg56gbYw&s",
    date: "May 20, 2025",
    subject: "Fiction Writers Club",
    summary:
      "A networking and feedback session for aspiring fiction writers. Bring your drafts and ideas!",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBPSWLh21sgFwdtMr5jllTfcKpsYt_5ZH09w&s",
    date: "May 25, 2025",
    subject: "Literary Discussion Panel",
    summary:
      "Panel of critics and authors discuss the evolution of storytelling in the digital age.",
  },
];

const EventsPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Sidebar */}
      <aside className="bg-gray-100 p-6 rounded-lg space-y-8">
        <div className="border-b border-gray-300 pb-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1e3a8a]">
            Event Categories
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {eventCategories.map((cat, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b border-gray-300 pb-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1e3a8a]">
            Latest Posts
          </h3>
          <ul className="space-y-4">
            {latestPosts.map((post, i) => (
              <li key={i} className="flex items-center gap-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:underline"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#1e3a8a]">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#1e3a8a] text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="lg:col-span-3 space-y-8">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">Upcoming Events</h2>
        <p className="text-gray-600 text-sm">Showing {events.length} results</p>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.subject}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">
                  {event.subject}
                </h3>
                <p className="text-sm text-gray-700">{event.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
