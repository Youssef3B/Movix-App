import { useEffect, useState } from "react";
import BtnLoad from "../components/BtnLoad";
import NavBar from "../components/NavBar";
import { useAllMovies } from "../contexts/AllMoviesContext";
import styles from "./MoviesPage.module.css";
import AlltvCard from "../components/AlltvCard";
import AllMoviesCard from "../components/AllMoviesCard";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const KEY = "c304bc735c8be64a60b32b0288dd6136";
const genreId = 80; // Genre ID for "Action"

function TvPage() {
  const { AllMovies } = useAllMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const [allMoviesData, setAllMoviesData] = useState(AllMovies);
  const [Genres, setAllGenres] = useState([]);

  const [genreId, setGenreId] = useState("");

  useEffect(() => {
    async function getGenres() {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=${KEY}`
      );
      const data = await res.json();
      console.log(data.genres);
      if (data.genres) {
        setAllGenres(data.genres);
      }
    }
    getGenres();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${KEY}&with_genres=${genreId}`
      );
      const data = await response.json();

      if (data.results) {
        setAllMoviesData(data.results);
      }
    };

    // Fetch the first page of movies unconditionally when the component is mounted.
    fetchMovies();
  }, [genreId]);

  const loadMoreMovies = async () => {
    const nextPage = currentPage + 1;
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${nextPage}&api_key=${KEY}&with_genres=${genreId}`
    );
    const data = await response.json();

    if (data.results) {
      setAllMoviesData((prevData) => [...prevData, ...data.results]);
      setCurrentPage(nextPage);
    }
  };

  if (!allMoviesData || !Genres) {
    return null;
  }

  return (
    <main>
      <NavBar />
      <div className={styles.title}>
        <h2>Explore Movies</h2>
        <select
          onChange={(e) => setGenreId(e.target.value)}
          value={genreId}
          className={styles.select}
          name="genre"
          id="genre"
        >
          <option>All Categories</option>

          {Genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.grid}>
        {allMoviesData.map((tv) => (
          <Link key={tv.id} to={`/detailsTv/${tv.id}`}>
            <AlltvCard tv={tv} />
          </Link>
        ))}
      </div>
      <BtnLoad onClick={loadMoreMovies}></BtnLoad>
      <Footer />
    </main>
  );
}

export default TvPage;
