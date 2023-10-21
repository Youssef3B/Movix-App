import { NavLink } from "react-router-dom";
import Details from "../components/Details";
import styles from "./MoviesDetails.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
function MoviesDetails() {
  return (
    <main>
      <NavBar />
      <Details />
      <Footer />
    </main>
  );
}

export default MoviesDetails;
