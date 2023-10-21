import MovieCard from "./MovieCard";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useMovies } from "../contexts/MoviesContext";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Loading from "./Loading";

function MoviesList() {
  const { TrendDay, TrendWeek, isActiveMovie2, isLoading } = useMovies();
  if (isLoading === false) {
    return <Loading />;
  }

  if (!TrendDay || !TrendWeek) {
    return null; // You can return a loading indicator or some other UI while data is being fetched
  }

  return (
    <div>
      <Swiper
        slidesPerView={2} // Show one movie per slide
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper grid"
        breakpoints={{
          768: {
            slidesPerView: 3, // Show 1 movie per slide on screens with a width of 768px or wider
          },
          992: {
            slidesPerView: 4, // Show 3 movies per slide on screens with a width of 992px or wider
          },
          1402: {
            slidesPerView: 5, // Show 3 movies per slide on screens with a width of 992px or wider
          },
        }}
      >
        {isActiveMovie2
          ? TrendWeek.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link key={movie.id} to={`/details/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </SwiperSlide>
            ))
          : TrendDay.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link key={movie.id} to={`/details/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default MoviesList;
