import React, { useState } from "react";
import styles from "./Categorie.module.css";
import { useMovies } from "../contexts/MoviesContext";

export default function FilterTvShow() {
  const { setIsActiveTvShow, setIsActiveTvShow2 } = useMovies();
  const [isActive, setIsActives] = useState(true); // Local state for "Day"
  const [isActive2, setIsActives2] = useState(false); // Local state for "Week"

  const handleActive1 = () => {
    setIsActives(true);
    setIsActives2(false);
    setIsActiveTvShow(true);
    setIsActiveTvShow2(false);
  };

  const handleActive2 = () => {
    setIsActives(false);
    setIsActives2(true);
    setIsActiveTvShow(false);
    setIsActiveTvShow2(true);
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
