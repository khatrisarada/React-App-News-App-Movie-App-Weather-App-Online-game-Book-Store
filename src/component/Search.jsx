import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ books, searchBooks, getBookDetails }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          required
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {books.length > 0 ? (
        <div className="book-list">
          {/* <h2>Search Results:</h2> */}
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <h3>{book.title}</h3>
              <p>Author(s): {book.author_name?.join(", ") || "Unknown"}</p>
              <p>Published: {book.first_publish_year || "Unknown"}</p>
              {book.isbn && (
                <button
                  className="details-button"
                  onClick={() => getBookDetails(book.isbn[0])}
                >
                  View Details
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No books found. Try another search.</p>
      )}
    </div>
  );
};

export default Search;