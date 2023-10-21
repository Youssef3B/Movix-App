import { NavLink } from "react-router-dom";
import Details from "../components/Details";
import styles from "./MoviesDetails.module.css";
import NavBar from "../components/NavBar";
import TvDetail from "../components/TvDetail";
import Footer from "../components/Footer";
function TvDetails() {
  return (
    <main>
      <NavBar />
      <TvDetail />
      <Footer />
    </main>
  );
}

export default TvDetails;
