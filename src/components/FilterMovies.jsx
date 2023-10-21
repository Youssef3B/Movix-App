import React, { useState } from "react";
import styles from "./Categorie.module.css";
import { useMovies } from "../contexts/MoviesContext";

export default function FilterMovies() {
  const { setIsActiveMovie, setIsActiveMovie2 } = useMovies();
  const [isActive, setIsActives] = useState(true); // Local state for "Day"
  const [isActive2, setIsActives2] = useState(false); // Local state for "Week"

  const handleActive1 = () => {
    setIsActives(true);
    setIsActives2(false);
    setIsActiveMovie(true);
    setIsActiveMovie2(false);
  };

  const handleActive2 = () => {
    setIsActives(false);
    setIsActives2(true);
    setIsActiveMovie(false);
    setIsActiveMovie2(true);
  };

  return (
    <div className={styles.cat}>
      <span onClick={handleActive1} className={isActive ? styles.active : ""}>
        Day
      </span>
      <span onClick={handleActive2} className={isActive2 ? styles.active2 : ""}>
        Week
      </span>
    </div>
  );
}
