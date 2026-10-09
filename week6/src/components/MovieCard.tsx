
type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
};

type MovieCardProps = {
  movie: Movie;
  onSelect: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
};

function MovieCard({
  movie,
  onSelect,
  isSaved = false,
  onToggleSave = () => {},
}: MovieCardProps) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <article className="movie-card">
      <button
        className="movie-card-image-button"
        type="button"
        onClick={onSelect}
        aria-label={`View details for ${movie.Title}`}
      >
        {hasPoster ? (
          <img
            className="movie-poster"
            src={movie.Poster}
            alt={`Poster for ${movie.Title}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="poster-placeholder" role="img" aria-label="Poster unavailable">
            <span aria-hidden="true">🎬</span>
            <span>Poster unavailable</span>
          </div>
        )}
      </button>

      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.Title}</h3>
        <p className="movie-card-year">
          {movie.Year}
          {movie.Type ? ` · ${movie.Type}` : ""}
        </p>

        <button
          className="movie-details-button"
          type="button"
          onClick={onSelect}
        >
          View details
        </button>
      </div>

      <button
        className="watchlist-button"
        type="button"
        onClick={onToggleSave}
        aria-pressed={isSaved}
        aria-label={
          isSaved
            ? `Remove ${movie.Title} from watchlist`
            : `Add ${movie.Title} to watchlist`
        }
      >
        {isSaved ? "✓ Saved" : "+ Watchlist"}
      </button>
    </article>
  );
}

export default MovieCard;