import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const BookDetails = ({ book, onBack }) => {
  return (
    <div className="book-details">
      <button className="back-button" onClick={onBack}>
        <FaArrowLeft /> Back to Search
      </button>
      <h2>{book.title}</h2>
      <p>Author(s): {book.authors?.map((author) => author.name).join(", ") || "Unknown"}</p>
      <p>Published: {book.publish_date || "Unknown"}</p>
      <p>Publisher: {book.publishers?.map((publisher) => publisher.name).join(", ") || "Unknown"}</p>
      <p>Pages: {book.number_of_pages || "Unknown"}</p>
      <p>ISBN: {book.isbn || "Unknown"}</p>
      {book.cover && <img src={book.cover.large} alt={book.title} className="book-cover" />}
    </div>
  );
};

export default BookDetails;