import { useState } from "react";
import styles from "./MovieCard.module.css";

function TvShowCard({ tv }) {
  const vote = tv.vote_average.toFixed(1); // Convert to a string with one decimal place
  const vote_average = vote.slice(0, 3); // Slice the first 3 characters
  // Input date string in the "YYYY-MM-DD" format
  const inputDateStr = tv.first_air_date;

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

  // Construct the formatted date string
  const formattedDateStr = `${month} ${day}, ${year}`;

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
  return (
    <div className={styles.card}>
      <div className={styles.relative}>
        <img
          src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
          alt="movie"
        ></img>
        <div className={styles.absolute}>
          <div
            className={`${styles.rating} ${getRatingStyle(
              Number(vote_average)
            )}`}
          >
            <h5>{vote_average}</h5>
          </div>
        </div>
      </div>
      <h3>{tv.name}</h3>
      <h6>{formattedDateStr}</h6>
    </div>
  );
}

export default TvShowCard;
