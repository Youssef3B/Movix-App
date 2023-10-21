import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { MoviesProvider } from "./contexts/MoviesContext";
import MoviesPage from "./pages/MoviesPage";
import { AllMoviesProvider } from "./contexts/AllMoviesContext";
import TvPage from "./pages/TvPage";
import MoviesDetails from "./pages/MoviesDetails";
import TvDetails from "./pages/TvDetails";
import { SearchProvider } from "./contexts/SearchContext";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <SearchProvider>
        <AllMoviesProvider>
          <MoviesProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="tv" element={<TvPage />} />
                <Route path="details/:id" element={<MoviesDetails />} />
                <Route path="detailsTv/:id" element={<TvDetails />} />
                <Route path="Search/:query" element={<Search />} />
              </Routes>
            </BrowserRouter>
          </MoviesProvider>
        </AllMoviesProvider>
      </SearchProvider>
    </>
  );
}

export default App;
