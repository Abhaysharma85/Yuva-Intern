
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import AuthModal from "./components/AuthModal";
import "./App.css";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
};

type MovieDetails = Movie & {
  Plot?: string;
  Genre?: string;
  Runtime?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
  Released?: string;
};



type AuthMode = "login" | "signup";
type View = "discover" | "watchlist";

const WATCHLIST_KEY = "movie-explorer-watchlist";
const SESSION_KEY = "movie-explorer-demo-session";




function readWatchlist(): Movie[] {
  try {
    const value = localStorage.getItem(WATCHLIST_KEY);
    const parsed: unknown = value ? JSON.parse(value) : [];

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is Movie =>
        typeof item?.imdbID === "string" &&
        typeof item?.Title === "string"
    );
  } catch {
    return [];
  }
}

function readSession(): string {
  try {
    return localStorage.getItem(SESSION_KEY) || "";
  } catch {
    return "";
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState<View>("discover");
  const [watchlist, setWatchlist] = useState<Movie[]>(readWatchlist);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [currentUser, setCurrentUser] = useState(readSession);
  const [notice, setNotice] = useState("");

  const searchController = useRef<AbortController | null>(null);
  const detailsController = useRef<AbortController | null>(null);
  const searchRequestId = useRef(0);
  const detailsRequestId = useRef(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
  try {
    return localStorage.getItem("movie-explorer-theme") === "dark";
  } catch {
    return false;
  }
});
  useEffect(() => {
  document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";

  try {
    localStorage.setItem(
      "movie-explorer-theme",
      isDarkMode ? "dark" : "light"
    );
  } catch {
    // The app can still work if browser storage is unavailable.
  }
}, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch {
      setError("Your browser could not save the watchlist.");
    }
  }, [watchlist]);

  useEffect(() => {
    if (!notice) return;

    const timeout = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    return () => {
      searchController.current?.abort();
      detailsController.current?.abort();
    };
  }, []);

  const searchMovies = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      setError("Enter a movie title to start searching.");
      setMovies([]);
      return;
    }

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    if (!apiKey) {
      setError("OMDb API key is missing. Check your .env file.");
      return;
    }

    searchController.current?.abort();

    const controller = new AbortController();
    searchController.current = controller;
    const requestId = ++searchRequestId.current;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Unable to contact the movie service.");
      }

      const data = await response.json();

      if (requestId !== searchRequestId.current) return;

      if (data.Response === "True" && Array.isArray(data.Search)) {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found. Try another title.");
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      if (requestId === searchRequestId.current) {
        setError("Something went wrong while searching. Please try again.");
      }
    } finally {
      if (requestId === searchRequestId.current) {
        setLoading(false);
      }
    }
  };

  const getMovieDetails = async (movie: Movie) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    if (!apiKey) {
      setError("OMDb API key is missing. Check your .env file.");
      return;
    }

    detailsController.current?.abort();

    const controller = new AbortController();
    detailsController.current = controller;
    const requestId = ++detailsRequestId.current;

    setSelectedMovie(null);
    setDetailsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(movie.imdbID)}&plot=full`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Unable to load movie details.");
      }

      const data = await response.json();

      if (requestId !== detailsRequestId.current) return;

      if (data.Response === "True") {
        setSelectedMovie(data as MovieDetails);
      } else {
        setError(data.Error || "Could not load movie details.");
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      if (requestId === detailsRequestId.current) {
        setError("Could not load movie details. Please try again.");
      }
    } finally {
      if (requestId === detailsRequestId.current) {
        setDetailsLoading(false);
      }
    }
  };

  const closeDetails = () => {
    detailsController.current?.abort();
    detailsRequestId.current += 1;
    setSelectedMovie(null);
    setDetailsLoading(false);
  };

  const toggleWatchlist = (movie: Movie) => {
    const alreadySaved = watchlist.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (alreadySaved) {
      setWatchlist((previous) =>
        previous.filter((item) => item.imdbID !== movie.imdbID)
      );
      setNotice("Removed from your watchlist.");
    } else {
      setWatchlist((previous) => [...previous, movie]);
      setNotice("Added to your watchlist.");
    }
  };

  const handleAuthSuccess = (email: string) => {
    try {
      localStorage.setItem(SESSION_KEY, email);
      setCurrentUser(email);
      setAuthMode(null);
      setNotice("You're logged in successfully.");
    } catch {
      setError("Could not save your demo session in this browser.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      setError("Could not clear the saved demo session.");
      return;
    }

    setCurrentUser("");
    setNotice("You have logged out.");
  };

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setError("");
  };

  const visibleMovies =
    activeView === "watchlist" ? watchlist : movies;

  return (
    <div className="app-shell" id="home">
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        onLoginClick={() => openAuth("login")}
        onSignupClick={() => openAuth("signup")}
        currentUser={currentUser ?? ""}
onLogoutClick={handleLogout}
isDarkMode={isDarkMode}
onThemeToggle={() => setIsDarkMode((previous) => !previous)}
      />

      <main className="main-content">
        <section className="hero-section">
          <p className="eyebrow">YOUR NEXT FAVORITE FILM AWAITS</p>
          <h1>Find a film worth <span>remembering.</span></h1>
          <p className="hero-description">
            Explore movies, discover stories, and keep your next watch close.
          </p>

          <form className="search-form" onSubmit={searchMovies} role="search">
            <label className="visually-hidden" htmlFor="movie-search">
              Search movie titles
            </label>
            <input
              id="movie-search"
              type="search"
              placeholder="Search a movie, like Inception..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search movies"}
            </button>
          </form>

          <p className="hero-hint">Try a title, actor, or movie you love.</p>
        </section>

        <section className="results-section" aria-labelledby="results-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {activeView === "watchlist" ? "YOUR COLLECTION" : "EXPLORE"}
              </p>
              <h2 id="results-heading">
                {activeView === "watchlist" ? "Your watchlist" : "Discover movies"}
              </h2>
            </div>
            <span className="results-count">
              {visibleMovies.length} {visibleMovies.length === 1 ? "movie" : "movies"}
            </span>
          </div>

          <div className="account-status">
  {currentUser ? (
    <>
      <p>
        Signed in as <strong>{currentUser}</strong>
      </p>
      <button
        className="text-button"
        type="button"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  ) : (
    <p>
      Sign in to your demo account to try the account features.
    </p>
  )}
</div>

          {error && (
            <p className="status-message error-message" role="alert">
              {error}
            </p>
          )}

          {loading && (
            <p className="status-message" role="status" aria-live="polite">
              Searching for movies...
            </p>
          )}

          {!loading && activeView === "discover" && movies.length === 0 && !error && (
            <div className="empty-state">
              <h3>Ready for your next movie?</h3>
              <p>Search for a title above to find movies and see their details.</p>
            </div>
          )}

          {!loading && activeView === "watchlist" && watchlist.length === 0 && (
            <div className="empty-state">
              <h3>Your watchlist is waiting</h3>
              <p>Save movies from Discover and they will appear here.</p>
              <button type="button" onClick={() => setActiveView("discover")}>
                Explore movies
              </button>
            </div>
          )}

          <div className="movie-grid">
            {visibleMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onSelect={() => getMovieDetails(movie)}
                isSaved={watchlist.some((item) => item.imdbID === movie.imdbID)}
                onToggleSave={() => toggleWatchlist(movie)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Movie Explorer · Made for movie lovers.</p>
      </footer>

      {notice && (
        <div className="toast-message" role="status" aria-live="polite">
          {notice}
        </div>
      )}

      {(selectedMovie || detailsLoading) && (
        <div className="modal-overlay" onClick={closeDetails}>
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={closeDetails}
              aria-label="Close movie details"
            >
              ×
            </button>

            {detailsLoading && (
              <p role="status" aria-live="polite">Loading movie details...</p>
            )}

            {selectedMovie && (
              <div className="movie-details">
                <img
                  className="details-poster"
                  src={
                    selectedMovie.Poster && selectedMovie.Poster !== "N/A"
                      ? selectedMovie.Poster
                      : ""
                  }
                  alt={
                    selectedMovie.Poster && selectedMovie.Poster !== "N/A"
                      ? `Poster for ${selectedMovie.Title}`
                      : "No movie poster available"
                  }
                />
                <div className="details-content">
                  <p className="eyebrow">MOVIE DETAILS</p>
                  <h2 id="movie-modal-title">{selectedMovie.Title}</h2>
                  <p className="details-meta">
                    {selectedMovie.Year}
                    {selectedMovie.Runtime ? ` · ${selectedMovie.Runtime}` : ""}
                    {selectedMovie.imdbRating && selectedMovie.imdbRating !== "N/A"
                      ? ` · IMDb ${selectedMovie.imdbRating}`
                      : ""}
                  </p>
                  {selectedMovie.Genre && <p><strong>Genre:</strong> {selectedMovie.Genre}</p>}
                  {selectedMovie.Director && <p><strong>Director:</strong> {selectedMovie.Director}</p>}
                  {selectedMovie.Actors && <p><strong>Cast:</strong> {selectedMovie.Actors}</p>}
                  <p className="details-plot">
                    {selectedMovie.Plot && selectedMovie.Plot !== "N/A"
                      ? selectedMovie.Plot
                      : "No plot summary is available."}
                  </p>
                  <button
                    className="details-watchlist-button"
                    type="button"
                    onClick={() => toggleWatchlist(selectedMovie)}
                  >
                    {watchlist.some((item) => item.imdbID === selectedMovie.imdbID)
                      ? "Remove from watchlist"
                      : "Add to watchlist"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}

export default App;