import React, { useContext, useEffect, createContext, useState } from "react";

const KEY = "c304bc735c8be64a60b32b0288dd6136";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [banner, setBanner] = useState("");
  const [TrendDay, setTrendDay] = useState();
  const [TrendWeek, setTrendWeek] = useState();
  const [TrendShowsDay, setTrendShowsDay] = useState();
  const [TrendShowsWeek, setTrendShowsWeek] = useState();
  const [TopRated, setTopRated] = useState();
  const [TopRatedTv, setTopRatedTv] = useState();
  const [isActiveMovie, setIsActiveMovie] = useState(true);
  const [isActiveMovie2, setIsActiveMovie2] = useState(false);
  const [isActiveTvShow, setIsActiveTvShow] = useState(true);
  const [isActiveTvShow2, setIsActiveTvShow2] = useState(false);
  const [isActiveTopRated, setIsActiveTopRated] = useState(true);
  const [isActiveTopRated2, setIsActiveTopRated2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getBanner() {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${KEY}`
    );
    const data = await res.json();
    const backdropPaths = data.results.map((result) => result.backdrop_path);

    const randomIndex = Math.floor(Math.random() * backdropPaths.length);
    const randomImg = backdropPaths[randomIndex];

    setBanner(randomImg);
  }
  async function trendingMoviesDay() {
    setIsLoading(false);
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${KEY}`
    );
    const data = await res.json();

    setTrendDay(data.results);
    setIsLoading(true);
  }
  async function trendingMoviesWeek() {
    setIsLoading(false);

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${KEY}`
    );
    const data = await res.json();

    setTrendWeek(data.results);
    setIsLoading(true);
  }
  async function trendingShowsDay() {
    setIsLoading(false);

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${KEY}`
    );
    const data = await res.json();
    setTrendShowsDay(data.results);
    setIsLoading(true);
  }
  async function trendingShowsWeek() {
    setIsLoading(false);

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${KEY}`
    );
    const data = await res.json();
    setTrendShowsWeek(data.results);
    setIsLoading(true);
  }
  async function TopRatedMovies() {
    setIsLoading(false);

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${KEY}`
    );
    const data = await res.json();
    setTopRated(data.results);
    setIsLoading(true);
  }
  async function TopRatedShow() {
    setIsLoading(false);

    const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${KEY}`
    );
    const data = await res.json();
    setTopRatedTv(data.results);
    setIsLoading(true);
  }

  useEffect(() => {
    getBanner();
    trendingMoviesDay();
    trendingMoviesWeek();
    trendingShowsDay();
    trendingShowsWeek();
    TopRatedMovies();
    TopRatedShow();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        getBanner,
        banner,
        TrendDay,
        TrendWeek,
        TrendShowsDay,
        TrendShowsWeek,
        TopRated,
        TopRatedTv,
        isActiveMovie,
        isActiveMovie2,
        setIsActiveMovie,
        setIsActiveMovie2,
        isActiveTvShow,
        isActiveTvShow2,
        setIsActiveTvShow,
        setIsActiveTvShow2,
        isActiveTopRated,
        setIsActiveTopRated,
        isActiveTopRated2,
        setIsActiveTopRated2,
        isLoading,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error("Movies Context used outside the Movies Provider");
  }
  return context;
}

export { MoviesProvider, useMovies };
