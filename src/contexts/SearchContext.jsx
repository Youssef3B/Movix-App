// SearchContext.js
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useLocalStorage from "use-local-storage";

const KEY = "c304bc735c8be64a60b32b0288dd6136";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useLocalStorage("");
  const [multi, setMulti] = useState([]);

  useEffect(() => {
    async function getSearch() {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1&api_key=${KEY}`
      );
      const data = await res.json();
      if (!Array.isArray(data.results)) {
        setMulti([]);
      } else {
        setMulti(data.results);
      }
    }

    getSearch();
  }, [search]); // Run when 'search' changes

  return (
    <SearchContext.Provider value={{ multi, search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// ...rest of the code

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("Movies Context used outside the Movies Provider");
  }
  return context;
}

export { SearchProvider, useSearch };
