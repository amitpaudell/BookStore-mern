import React from 'react';
import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommended = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 ">Recommended for you </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.map((book, index) => {
            return (
              <SwiperSlide key={index}>
                <BookCard book={book}></BookCard>;
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Recommended;
