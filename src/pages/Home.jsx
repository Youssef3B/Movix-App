import Categorie from "../components/Categorie";
import FilterMovies from "../components/FilterMovies";
import FilterTopRated from "../components/FilterTopRated";
import FilterTvShow from "../components/FilterTvShow";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import MoviesList from "../components/MoviesList";
import NavBar from "../components/NavBar";
import TVShowsList from "../components/TVShowsList";
import TopRatedList from "../components/TopRatedList";
import { useMovies } from "../contexts/MoviesContext";

export default function Home() {
  const { getBanner } = useMovies(); // You can access the context value here if needed.
  return (
    <main className="">
      <NavBar />
      <Hero />
      <div className="main">
        <div className="flex">
          <Categorie>Movies</Categorie>
          <FilterMovies />
        </div>
        <MoviesList />

        <div className="flex">
          <Categorie>Tv Shows</Categorie>
          <FilterTvShow />
        </div>
        <TVShowsList />
        <div className="flex">
          <Categorie>Top Rated</Categorie>
          <FilterTopRated />
        </div>
        <TopRatedList />
      </div>
      <Footer />
    </main>
  );
}
