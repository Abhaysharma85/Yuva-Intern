
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] =
    useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMovie(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const searchMovies = async () => {
    const query = searchTerm.trim();

    if (!query) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(
          data.Error === "Movie not found!"
            ? ""
            : data.Error || "Unable to search movies."
        );
        return;
      }

      setMovies(data.Search || []);
    } catch {
      setMovies([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbID: string) => {
    setDetailsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error || "Unable to load movie details.");
        return;
      }

      setSelectedMovie(data as MovieDetails);
    } catch {
      setError("Unable to load movie details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="app">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">YOUR NEXT FAVORITE FILM AWAITS</p>

          <h1 id="hero-title">Find Your Next Movie.</h1>

          <p className="hero-description">
            Explore movies, discover stories, and find something worth watching.
          </p>

          <form
            className="search-area"
            onSubmit={(event) => {
              event.preventDefault();
              void searchMovies();
            }}
            role="search"
          >
            <label className="visually-hidden" htmlFor="movie-search">
              Search movies
            </label>

            <input
              id="movie-search"
              type="search"
              placeholder="Search by movie title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search movies"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search movies"}
            </button>
          </form>
        </section>

        <section className="results-section" aria-label="Movie search results">
          {movies.length > 0 && (
            <div className="section-heading">
              <div>
                <p className="eyebrow">MOVIE COLLECTION</p>
                <h2>Search results</h2>
              </div>

              <p className="results-count">
                {movies.length} {movies.length === 1 ? "movie" : "movies"}
              </p>
            </div>
          )}

          {loading && (
            <p className="status-message" role="status" aria-live="polite">
              Finding movies for you...
            </p>
          )}

          {error && (
            <div className="status-message error" role="alert">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => void searchMovies()}
                disabled={loading}
              >
                Try again
              </button>
            </div>
          )}

          {!loading &&
            movies.length === 0 &&
            searchTerm.trim() &&
            !error && (
              <div className="empty-state" role="status">
                <h2>No movies found</h2>
                <p>
                  We couldn't find a movie matching "{searchTerm}". Try another
                  title.
                </p>
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
        </section>

        {detailsLoading && (
          <p className="status-message" role="status" aria-live="polite">
            Loading movie details...
          </p>
        )}
      </main>

      {selectedMovie && !detailsLoading && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <section
            className="movie-details"
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close movie details"
              autoFocus
            >
              ×
            </button>

            <div className="details-poster">
              {selectedMovie.Poster &&
              selectedMovie.Poster !== "N/A" ? (
                <img
                  src={selectedMovie.Poster}
                  alt={`${selectedMovie.Title} poster`}
                />
              ) : (
                <div className="poster-placeholder">Poster unavailable</div>
              )}
            </div>

            <div className="details-content">
              <p className="eyebrow">MOVIE DETAILS</p>
              <h2 id="movie-details-title">{selectedMovie.Title}</h2>

              <p>
                <strong>Year:</strong> {selectedMovie.Year}
              </p>
              <p>
                <strong>Genre:</strong> {selectedMovie.Genre || "Not available"}
              </p>
              <p>
                <strong>Runtime:</strong>{" "}
                {selectedMovie.Runtime || "Not available"}
              </p>
              <p>
                <strong>IMDb Rating:</strong>{" "}
                {selectedMovie.imdbRating &&
                selectedMovie.imdbRating !== "N/A"
                  ? `★ ${selectedMovie.imdbRating}/10`
                  : "Not available"}
              </p>
              <p>
                <strong>Director:</strong>{" "}
                {selectedMovie.Director || "Not available"}
              </p>
              <p>
                <strong>Actors:</strong>{" "}
                {selectedMovie.Actors || "Not available"}
              </p>
              <p className="movie-plot">
                <strong>Plot:</strong>{" "}
                {selectedMovie.Plot || "No plot available."}
              </p>

              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
              >
                Close details
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;