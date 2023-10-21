// SearchInp.js
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import Button from "./Button";
import styles from "./SearchInp.module.css";

function SearchInp() {
  const { search, setSearch } = useSearch();

  const handleSearchClick = () => {
    // Call setSearch to update the search state
    // This will trigger the useEffect in SearchProvider
    // and fetch data with the new search query.
    setSearch(search);
  };

  return (
    <div className={styles.SearchInp}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a movie or TV show..."
        className={styles.input}
        type="text"
      ></input>
      <Link to={`/Search/${search}`}>
        <Button onClick={handleSearchClick}>Search</Button>
      </Link>
    </div>
  );
}

export default SearchInp;
