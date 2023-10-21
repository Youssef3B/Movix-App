import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "./Logo";
function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>

      <ul>
        <NavLink to="/movies">
          <li>Movies</li>
        </NavLink>
        <NavLink to="/tv">
          <li>TV Shows</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
