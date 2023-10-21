import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import SimilarCard from "./SimilarCard";
import SimilarCardTv from "./SimilarCardTv";

const KEY = "c304bc735c8be64a60b32b0288dd6136";

function TvDetail() {
  const [detailMovie, setDetailMovie] = useState();
  const [Castors, setCastors] = useState([]);
  const [Directors, setDirectors] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [Similar, setSimilar] = useState([]);
  const [Recommendations, setRecommendations] = useState([]);
  const { id } = useParams();

  useEffect(
    function () {
      async function getId() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${KEY}`
          );
          const data = await res.json();
          if (data) {
            setDetailMovie(data);
            console.log(data);
          }
        } catch (error) {}
      }
      getId();
      window.scrollTo(0, 0);
    },
    [id]
  );

  useEffect(
    function () {
      async function getCasters() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${KEY}`
          );
          const data = await res.json();
          if (data && Array.isArray(data.cast) && Array.isArray(data.crew)) {
            setCastors(data.cast);
            setDirectors(data.crew);
          }
        } catch (error) {}
      }
      getCasters();
    },
    [id]
  );
  useEffect(
    function () {
      async function getTrailers() {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${KEY}`
        );
        const data = await res.json();
        if (data) {
          setVideos(data.results);
        }
      }
      getTrailers();
    },
    [id]
  );
  useEffect(
    function () {
      async function getSimilar() {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1&api_key=${KEY}`
        );
        const data = await res.json();
        if (Array.isArray(data.results)) {
          setSimilar(data.results);
        }
      }
      getSimilar();
    },
    [id]
  );
  useEffect(
    function () {
      async function getRecommendations() {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1&api_key=${KEY}`
        );
        const data = await res.json();
        if (Array.isArray(data.results)) {
          setRecommendations(data.results);
        }
      }
      getRecommendations();
    },
    [id]
  );

  if (!detailMovie || !Array.isArray(Castors || Videos)) {
    return null;
  }
  const topCastors = Castors.slice(0, 6);
  const Trailers = Videos.filter((item) => item.type === "Trailer");
  const inputDateStr = detailMovie.first_air_date;

  // Create a Date object fr.release_date
  const inputDate = new Date(inputDateStr);

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month, day, and year from the Date object
  const month = monthNames[inputDate.getMonth()]; // Month is 0-based, so we use it as an index
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDateStr = `${month} ${day}, ${year}`;

  const vote = detailMovie.vote_average.toFixed(1); // Convert to a string with one decimal place
  const vote_average = vote.slice(0, 3); // Slice the first 3 characters
  const getRatingStyle = (voteAverage) => {
    if (voteAverage <= 2) {
      return styles.bad;
    } else if (voteAverage <= 4) {
      return styles.lititlebad;
    } else if (voteAverage <= 6) {
      return styles.notbad;
    } else if (voteAverage <= 8) {
      return styles.good;
    } else {
      return styles.perfect;
    }
  };

  const uniqueDirectorNames = new Set(); // Create a Set to store unique names
  const dire = Directors.filter((item) => {
    if (
      item.known_for_department === "Directing" &&
      !uniqueDirectorNames.has(item.name)
    ) {
      uniqueDirectorNames.add(item.name); // Add the director's name to the Set
      return true; // Include this director in the filtered array
    }
    return false; // Exclude directors with duplicate names
  });
  const heroStyles = {
    backgroundImage: `linear-gradient(
      to top,
      rgba(4, 21, 45, 0.99),
      rgba(4, 21, 45, 0.778) 30%
    ),
    url(https://image.tmdb.org/t/p/original${detailMovie.backdrop_path})`,
  };
  return (
    <section className={styles.Details} style={heroStyles}>
      <div className={styles.grid}>
        <div>
          {detailMovie && (
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original/${detailMovie.poster_path}`}
              alt="poster"
            />
          )}
        </div>
        <div>
          <h2>{detailMovie.name}</h2>

          {detailMovie && (
            <>
              <h5>{detailMovie.tagline}</h5>
              <div className={styles.genres}>
                {detailMovie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>

              <div>
                <span
                  className={`${styles.rating} ${getRatingStyle(
                    Number(vote_average)
                  )}`}
                >
                  {vote_average}
                </span>
              </div>
              <h4>Overview</h4>
              <p>{detailMovie.overview}</p>
              <ul>
                <li>
                  Status: <span>{detailMovie.status}</span>
                </li>
                <li>
                  Release Date: <span>{formattedDateStr}</span>
                </li>
                <li>
                  Number Of Episodes:{" "}
                  <span>{detailMovie.number_of_episodes}</span>
                </li>
                <li>
                  Number Of Seasons:{" "}
                  <span>{detailMovie.number_of_seasons}</span>
                </li>
              </ul>
              <ul>
                <li>
                  Director:{" "}
                  <span>
                    {" "}
                    {dire.map((director) => director.name).join(", ")}
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  production_companies:{" "}
                  <span>
                    {detailMovie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
      <div className={styles.cast}>
        <h4>Top Cast</h4>
        <div className={styles.grid2}>
          {topCastors.map((castor) => (
            <Castor castor={castor} key={castor.id} />
          ))}
        </div>
      </div>
      <div className={styles.videos}>
        <h4>Official Videos</h4>
        <div className={styles.grid3}>
          {Trailers.map((Trailer) => (
            <iframe
              key={Trailer.id}
              src={`https://www.youtube.com/embed/${Trailer.key}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          ))}
        </div>
      </div>
      <div className={styles.Similar}>
        <h4>Similar Movies</h4>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper grid"
        >
          {Similar.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link key={movie.id} to={`/detailsTv/${movie.id}`}>
                <SimilarCardTv movie={movie} key={movie.id} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.Similar}>
        <h4>Recommendations</h4>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper grid"
        >
          {Recommendations.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link key={movie.id} to={`/detailsTv/${movie.id}`}>
                <SimilarCardTv movie={movie} key={movie.id} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Castor({ castor }) {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original/${castor.profile_path}`}
        alt=""
      />
      <h5>{castor.name}</h5>
      <p>{castor.character}</p>
    </div>
  );
}

export default TvDetail;
