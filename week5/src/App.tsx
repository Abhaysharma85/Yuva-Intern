import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";

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
  // Store the movies returned by the search API
  const [movies, setMovies] = useState<Movie[]>([]);

  // Track whether the movie search is currently loading
  const [loading, setLoading] = useState(false);

  // Store any error message that needs to be shown to the user
  const [error, setError] = useState("");

  // Store the text entered in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Store the full details of the movie selected by the user
  const [selectedMovie, setSelectedMovie] =
    useState<MovieDetails | null>(null);

  // Track loading separately when movie details are being fetched
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Allow the user to close the movie details using the Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMovie(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Remove the event listener when the component is removed
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Fetch full information for a selected movie
  const getMovieDetails = async (imdbID: string) => {
    setDetailsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
      );

      const data = await response.json();

      // Check if the API returned an error
      if (data.Response === "False") {
        setError(data.Error || "Unable to load movie details.");
        return;
      }

      
      setSelectedMovie(data);
    } catch {
      // Handle network or request errors
      setError("Unable to load movie details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Search the OMDb API using the user's search term
  const searchMovies = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    // Close any previously opened movie details
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${searchTerm}`
      );

      const data = await response.json();

      // Clear the movie list if the API does not find anything
      if (data.Response === "False") {
        setError("");
        setMovies([]);
        return;
      }

      // Store the search results
      setMovies(data.Search || []);
    } catch {
      // Show a simple message if the API request fails
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
              // Allow the user to search by pressing Enter
              if (e.key === "Enter") {
                searchMovies();
              }
            }}
          />

          <button
            type="button"
            onClick={searchMovies}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Show a message while movies are being loaded */}
        {loading && (
          <div className="status-message">
            <p>Loading movies...</p>
          </div>
        )}

        {/* Show API or network errors */}
        {error && (
          <div className="status-message error">
            <p>{error}</p>

            <button
              type="button"
              onClick={searchMovies}
              disabled={loading}
            >
              {loading ? "Searching..." : "Try Again"}
            </button>
          </div>
        )}

        {/* Tell the user when the search returned no movies */}
        {!loading &&
          movies.length === 0 &&
          searchTerm.trim() &&
          !error && (
            <div className="status-message">
              <p>No movies found for "{searchTerm}".</p>
            </div>
          )}

        {/* Display all movies returned by the API */}
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={getMovieDetails}
            />
          ))}
        </div>

        {/* Show a separate loading message while movie details load */}
        {detailsLoading && (
          <div className="status-message">
            <p>Loading movie details...</p>
          </div>
        )}
      </main>

      {/* Display the selected movie in a modal */}
      {selectedMovie && !detailsLoading && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <section
            className="movie-details"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close the modal using the X button */}
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

              {/* Close button at the bottom of the details */}
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