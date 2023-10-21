import { useEffect, useState } from "react";
import BtnLoad from "../components/BtnLoad";
import NavBar from "../components/NavBar";
import { useAllMovies } from "../contexts/AllMoviesContext";
import styles from "./MoviesPage.module.css";
import AlltvCard from "../components/AlltvCard";
import AllMoviesCard from "../components/AllMoviesCard";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import Query from "../components/Query";
import Footer from "../components/Footer";
const KEY = "c304bc735c8be64a60b32b0288dd6136";

function TvPage() {
  const { multi, search } = useSearch();

  return (
    <main>
      <NavBar />
      <div className={styles.title}>
        <h2>Search results of {search}</h2>
      </div>
      <div className={styles.grid}>
        {multi.map((movie) =>
          movie.media_type === "movie" ? (
            <Link key={movie.id} to={`/details/${movie.id}`}>
              <Query key={movie.id} movie={movie} />
            </Link>
          ) : (
            <Link key={movie.id} to={`/detailsTv/${movie.id}`}>
              <Query key={movie.id} movie={movie} />
            </Link>
          )
        )}
      </div>
      <Footer />
    </main>
  );
}

export default TvPage;
