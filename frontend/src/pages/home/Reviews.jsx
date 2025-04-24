import React from 'react';
import reviewer1 from '../../assets/reviewer1.webp';
import reviewer2 from '../../assets/reviewer2.webp';
import reviewer3 from '../../assets/reviewer3.webp';
import reviewer4 from '../../assets/reviewer4.jpeg';
import reviewer5 from '../../assets/reviewer5.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const reviews = [
  {
    name: 'Nosipho Ndlovu',
    text: 'An absolutely captivating read. The storyline was gripping and the characters felt incredibly real. I loved how every chapter left me wanting more. Highly recommend this for book lovers!',
    image: reviewer1,
    rating: 5,
  },
  {
    name: 'Sophia Turner',
    text: 'A perfect book for any weekend. The plot twists kept me guessing all the way through! Definitely a page-turner with characters I could relate to deeply.',
    image: reviewer2,
    rating: 4,
  },
  {
    name: 'Ogo Chiba',
    text: 'Loved it! Beautifully written with depth and emotion. The author’s voice is so compelling and heartfelt. I couldn’t put it down and finished it in one sitting.',
    image: reviewer3,
    rating: 5,
  },
  {
    name: 'Emma Scott',
    text: 'Brilliantly structured and thought-provoking. This book makes you reflect while still keeping you entertained. One of my favorite reads this year, hands down.',
    image: reviewer4,
    rating: 4,
  },
  {
    name: 'Lily Adams',
    text: 'A masterclass in storytelling. I was hooked from the very first page and loved every moment. It’s one of those books you’ll be thinking about for days.',
    image: reviewer5,
    rating: 5,
  },
];

const renderStars = (rating) => (
  <div className="flex items-center space-x-1 text-yellow-400 mb-2">
    {Array.from({ length: rating }, (_, i) => <span key={i}>★</span>)}
    {Array.from({ length: 5 - rating }, (_, i) => <span key={i}>☆</span>)}
  </div>
);

const Reviews = () => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-screen-xl mx-auto" id="reviews">
      <h2 className="text-4xl font-bold text-[#1e3a8a] mb-12 text-center">
        Reader Reviews
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-stretch w-[95%] max-w-4xl mx-auto h-auto md:h-[270px] bg-white shadow-md rounded-xl overflow-hidden transition duration-300">
              {/* Review Content */}
              <div className="flex-1 p-6 flex flex-col justify-center text-[#1e3a8a] bg-gray-50">
                <p className="text-base mb-4 leading-relaxed line-clamp-5">"{review.text}"</p>
                {renderStars(review.rating)}
                <h4 className="text-xl font-semibold">{review.name}</h4>
              </div>

              {/* Reviewer Image Responsive */}
              <div className="w-full md:w-[300px] h-[250px] md:h-full shrink-0">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper style overrides */}
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          top: 50%;
          transform: translateY(-50%);
          background-color: white;
          color: #1e3a8a;
          padding: 1rem;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .swiper-button-prev {
          left: 10px;
        }

        .swiper-button-next {
          right: 10px;
        }

        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 16px;
          font-weight: bold;
        }

        .swiper-pagination {
          margin-top: 1.5rem;
          text-align: center;
        }

        .swiper-pagination-bullet {
          background: #1e3a8a;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #1e3a8a;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Reviews;






