const Search = ({
  onSearchChange,
  isSearching,
  fetchSearchResult,
  onSearchFilter,
  onSearchClick,
}) => {
  console.log("fetchSearchResult", fetchSearchResult);
  return (
    <>
      <div className="Search-title">Search For the Book Title</div>
      <div className="search-container">
        <input
          className="input-field"
          onChange={({ target }) => onSearchChange(target.value)}
        />
        <button className="search-button" onClick={onSearchClick}>
          Search
        </button>
        <span className="search-filter">
          Filter
          <select
            className="filter"
            onChange={({ target }) => onSearchFilter(target.value)}
          >
            <option value="all">All</option>
            <option value="author">Author</option>
            <option value="title"> Title</option>
            <option value="sort">Sort A-z</option>
          </select>
        </span>
      </div>
    </>
  );
};

export default Search;
