import MovieCard from "./MovieCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useMovies } from "../contexts/MoviesContext";
import TopRatedCard from "./TopRatedCard";
import TopRatedCardTv from "./TopRatedCardTv";
import { Link } from "react-router-dom";

function TopRatedList() {
  const { TopRated, TopRatedTv, isActiveTopRated2, isLoading } = useMovies();

  if (!TopRated || !TopRatedTv) {
    return null; // You can return a loading indicator or some other UI while data is being fetched
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
        {isActiveTopRated2
          ? TopRatedTv.map((top) => (
              <SwiperSlide key={top.id}>
                <Link key={top.id} to={`/detailsTv/${top.id}`}>
                  <TopRatedCardTv top={top} />
                </Link>
              </SwiperSlide>
            ))
          : TopRated.map((top) => (
              <SwiperSlide key={top.id}>
                <Link key={top.id} to={`/details/${top.id}`}>
                  <TopRatedCard top={top} />
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default TopRatedList;
