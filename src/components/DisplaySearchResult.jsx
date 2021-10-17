import "./displayCard.scss";

const DisplaySearchResult = ({
  selectedItem,
  onSearchChange,
  isSearching,
  onListSelect,
  fetchSearchResult,
}) => {
  return (
    <>
      <div
        className={
          isSearching ? "list-search-card" : "search-container-display"
        }
      >
        {fetchSearchResult &&
          fetchSearchResult.map((item, index) => {
            return (
              <div className={"list-card"} key={index}>
                <div className="card-item">
                  <img
                    width="60px"
                    height="60px"
                    src={`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg?default=https://openlibrary.org/static/images/icons/avatar_book-sm.png`}
                  />
                  <span className="list-text"> {item.title} </span>

                  <div className="author-name">
                    <span style={{ color: "black" }}> by -</span>{" "}
                    {item.author_name && item.author_name.length > 1
                      ? item.author_name.join(",")
                      : item.author_name}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DisplaySearchResult;
