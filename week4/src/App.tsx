import { useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type MovieDetails = {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Runtime: string;
  Director: string;
  Actors: string;
  imdbRating: string;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] =
    useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const getMovieDetails = async (imdbID: string) => {
    setDetailsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error || "Unable to load movie details.");
        return;
      }

      setSelectedMovie(data);
    } catch {
      setError("Unable to load movie details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${searchTerm}`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error || "No movies found.");
        setMovies([]);
        return;
      }

      setMovies(data.Search || []);
    } catch {
      setError("Something went wrong. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="app">
        <h1>Find Your Next Movie</h1>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies();
              }
            }}
          />

          <button onClick={searchMovies}>Search</button>
        </div>

        {loading && (
          <div className="status-message">
            <p>Loading movies...</p>
          </div>
        )}

        {error && (
  <div className="status-message error">
    <p>{error}</p>

    <button onClick={searchMovies} disabled={loading}>
  {loading ? "Searching..." : "Search"}
</button>
  </div>
)}

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={getMovieDetails}
            />
          ))}
        </div>

        {detailsLoading && (
          <div className="status-message">
            <p>Loading movie details...</p>
          </div>
        )}
      </main>

      {selectedMovie && !detailsLoading && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <section
            className="movie-details"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close movie details"
            >
              ×
            </button>

            <div className="details-poster">
              {selectedMovie.Poster !== "N/A" && (
                <img
                  src={selectedMovie.Poster}
                  alt={`${selectedMovie.Title} poster`}
                />
              )}
            </div>

            <div className="details-content">
              <h2>{selectedMovie.Title}</h2>

              <p>
                <strong>Year:</strong> {selectedMovie.Year}
              </p>

              <p>
                <strong>Genre:</strong> {selectedMovie.Genre}
              </p>

              <p>
                <strong>Runtime:</strong> {selectedMovie.Runtime}
              </p>

              <p>
                <strong>IMDb Rating:</strong> ⭐{" "}
                {selectedMovie.imdbRating}
              </p>

              <p>
                <strong>Director:</strong> {selectedMovie.Director}
              </p>

              <p>
                <strong>Actors:</strong> {selectedMovie.Actors}
              </p>

              <p>
                <strong>Plot:</strong> {selectedMovie.Plot}
              </p>

              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;