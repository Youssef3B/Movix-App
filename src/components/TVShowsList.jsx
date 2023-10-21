import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useMovies } from "../contexts/MoviesContext";
import TvShowCard from "./TvShowCard";
import { Link } from "react-router-dom";

function TVShowsList() {
  const { TrendShowsDay, TrendShowsWeek, isActiveTvShow, isLoading } =
    useMovies();
  if (!TrendShowsDay || !TrendShowsWeek) {
    return null;
  }
  if (isLoading === false) {
    return <Loading />;
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
        {isActiveTvShow
          ? TrendShowsWeek.map((tv) => (
              <SwiperSlide key={tv.id}>
                <Link key={tv.id} to={`/detailsTv/${tv.id}`}>
                  <TvShowCard tv={tv} />
                </Link>
              </SwiperSlide>
            ))
          : TrendShowsDay.map((tv) => (
              <SwiperSlide key={tv.id}>
                <Link key={tv.id} to={`/detailsTv/${tv.id}`}>
                  <TvShowCard tv={tv} />
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default TVShowsList;
