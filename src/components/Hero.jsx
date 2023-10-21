import React from "react";
import SearchInp from "./SearchInp";
import styles from "./Hero.module.css";
import { useMovies } from "../contexts/MoviesContext";

export default function Hero() {
  const { banner } = useMovies();

  const heroStyles = {
    backgroundImage: `linear-gradient(to top, rgba(4, 21, 45, 0.99), rgba(4, 21, 45, 0) 30%), url(https://image.tmdb.org/t/p/original${banner})`,
  };

  return (
    <section className={styles.HeroSection} style={heroStyles}>
      <div className={styles.Content}>
        <h1>Welcome.</h1>
        <h2>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <SearchInp />
      </div>
    </section>
  );
}
