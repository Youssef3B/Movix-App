import React, { useContext, useEffect, createContext, useState } from "react";

const KEY = "c304bc735c8be64a60b32b0288dd6136";

const AllMoviesContext = createContext();

function AllMoviesProvider({ children }) {
  const [AllMovies, setAllMovies] = useState([]);
  const [AllTv, setAllTv] = useState([]);
  async function getAllMovies() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${KEY}`
    );
    const data = await res.json();
    setAllMovies(data.results);
  }

  async function getAllTv() {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${KEY}`
    );
    const data = await res.json();
    setAllTv(data.results);
  }

  useEffect(function () {
    getAllMovies();
    getAllTv();
  }, []);
  return (
    <AllMoviesContext.Provider value={{ AllMovies, AllTv }}>
      {children}
    </AllMoviesContext.Provider>
  );
}
function useAllMovies() {
  const context = useContext(AllMoviesContext);
  if (context === undefined) {
    throw new Error("Movies Context used outside the Movies Provider");
  }
  return context;
}
export { AllMoviesProvider, useAllMovies };
