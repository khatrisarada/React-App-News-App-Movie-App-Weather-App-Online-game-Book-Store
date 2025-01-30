import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

const MovieHouse = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [trailers, setTrailers] = useState({});
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: "0fa2853e7c4d6c8f146aba861c5e4a06",
          },
        }
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  // Fetch movies and trailers
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "0fa2853e7c4d6c8f146aba861c5e4a06",
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: searchQuery,
          },
        }
      );
      setMovies(response.data.results);

      // Fetch trailers for each movie
      response.data.results.forEach(async (movie) => {
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          {
            params: {
              api_key: "0fa2853e7c4d6c8f146aba861c5e4a06",
            },
          }
        );
        const trailer = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailers((prevTrailers) => ({
            ...prevTrailers,
            [movie.id]: trailer.key,
          }));
        }
      });
    };
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearchSubmit = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "0fa2853e7c4d6c8f146aba861c5e4a06",
          query: searchQuery,
        },
      }
    );
    setMovies(response.data.results);
  };

  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  const TrailerModal = ({ trailerKey, onClose }) => {
    if (!trailerKey) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
        MovieHouse
      </h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <AiOutlineSearch className="inline-block" />
        </button>
      </div>
      <div className="flex justify-center space-x-4 mb-8">
        <label htmlFor="sort-by" className="self-center">
          Sort By:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={handleSortChange}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
        <label htmlFor="genre" className="self-center">
          Genre:
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md w-64 p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedTrailer(trailers[movie.id])}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-yellow-500 font-medium mb-2">
              Rating: {movie.vote_average}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              {expandedMovieId === movie.id
                ? movie.overview
                : `${movie.overview.substring(0, 150)}...`}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDescription(movie.id);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {expandedMovieId === movie.id ? "Show Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
      <TrailerModal
        trailerKey={selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
      />
    </div>
  );
};

export default MovieHouse;