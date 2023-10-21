import React, { useState } from "react";
import styles from "./Categorie.module.css";
import CategorieTitle from "./CategorieTitle";
import { useMovies } from "../contexts/MoviesContext";
import FilterMovies from "./FilterMovies";

export default function Categorie({ children }) {
  return (
    <section className={styles.Categorie}>
      <h3>{children}</h3>
    </section>
  );
}
