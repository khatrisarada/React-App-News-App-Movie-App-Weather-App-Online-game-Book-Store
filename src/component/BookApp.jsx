// import React, { useState } from "react";
import axios from "axios";
// import Search from "./search";
// import BookDetails from "./BookDetails";
// // import Search from "./components/Search";
// // import BookDetails from "./components/BookDetails";
import { PuffLoader } from "react-spinners";
// // import "./book.css";

// function BookApp() {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const searchBooks = async (query) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `https://openlibrary.org/search.json?q=${query}`
//       );
//       setBooks(response.data.docs);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch books. Please try again.");
//       setBooks([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getBookDetails = async (isbn) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
//       );
//       setSelectedBook(response.data[`ISBN:${isbn}`]);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch book details. Please try again.");
//       setSelectedBook(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>📚 Book Search App</h1>
//       {error && <p className="error">{error}</p>}
//       {isLoading ? (
//         <div className="loader">
//           <PuffLoader color="#36d7b7" />
//         </div>
        
//       ) : !selectedBook ? (
//         <Search books={books} searchBooks={searchBooks} getBookDetails={getBookDetails} />
//       ) : (
//         <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
//       )}
//     </div>
//   );
// }

// export default BookApp;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AppProvider } from './context/context';
// import { AppProvider } from "./context/context";
// import SearchForm from './components/SearchForm';
// import BookList from './components/BookList';
// import BookDetails from './components/BookDetails';

// const App = () => {
//     return (
//         <AppProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<SearchForm />} />
//                     <Route path="/book" element={<BookList />} />
//                     <Route path="/book/:id" element={<BookDetails />} />
//                 </Routes>
//             </Router>
//         </AppProvider>
//     );
// }

// export default App;
