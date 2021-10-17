import { useState } from "react";
import Search from "./components/Search";
import DisplaySearchResult from "./components/DisplaySearchResult";

const Home = () => {
  const [fetchSearchResult, setFecthSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchText, setSearchText] = useState("");

  const onSearchChange = (value) => {
    setSearchText(value);
  };

  const onSearchClick = () => {
    setIsSearching(true);
    setIsSearchSelected(true);
    let value = searchText;
    if (value.length > 3) {
      fetchAPI("q", value);
    }
  };

  const onListSelect = (item) => {
    console.log("onListSelect", item);
    fetch(`https://openlibrary.org${item.key}.json`)
      .then((response) => response.json())
      .then((resp) => {
        setIsSearchSelected(true);
        setSelectedItem(resp);
        console.log("after select", resp);
      })
      .catch((err) => {
        setIsSearchSelected(false);
        console.log("fetch data error", err);
      });
  };

  const onSearchFilter = (value) => {
    console.log(value);
    setIsSearching(true);
    let inputText = searchText;
    if (value === "author") {
      fetchAPI("author", inputText);
    } else if (value === "title") {
      fetchAPI("title", inputText);
    } else if (value == "all") {
      fetchAPI("q", inputText);
    } else if (value === "sort") {
      console.log("sort");
      let searchRes = [...fetchSearchResult];
      searchRes.sort((a, b) => a.title.localeCompare(b.title));
      console.log("called sort", fetchSearchResult, searchRes);
      setFecthSearchResult([...searchRes]);
      setIsSearching(false);
    }
  };
  //arrow function
  const fetchAPI = (query, value) => {
    fetch(
      `https://openlibrary.org/search.json?${query}=${value}&_facet=false&_spellcheck_count=0&limit=100&fields=key,cover_i,title,author_name,name&mode=everything`
    )
      .then((response) => response.json())
      .then((data) => {
        let result = data.docs ? data.docs : [];
        setFecthSearchResult([...result]);
        console.log("data", data);
        setIsSearching(false);
      })
      .catch((err) => {
        setIsSearching(false);
        console.log("error in fetching data", err);
      });
  };

  return (
    <>
      <div className="heading">Open Library</div>

      <Search
        onSearchChange={onSearchChange}
        fetchSearchResult={fetchSearchResult}
        isSearching={isSearching}
        onListSelect={onListSelect}
        onSearchClick={() => onSearchClick()}
        onSearchFilter={onSearchFilter}
      />
      {isSearchSelected && (
        <DisplaySearchResult
          fetchSearchResult={fetchSearchResult}
          isSearching={isSearching}
        />
      )}
    </>
  );
};

export default Home;
