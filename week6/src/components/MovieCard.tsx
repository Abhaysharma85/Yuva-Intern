
type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type MovieCardProps = {
  movie: Movie;
  onSelect: (imdbID: string) => void;
};

function MovieCard({ movie, onSelect }: MovieCardProps) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <article className="movie-card">
      <button
        className="movie-card-button"
        type="button"
        onClick={() => onSelect(movie.imdbID)}
        aria-label={`View details for ${movie.Title}, ${movie.Year}`}
      >
        <div className="movie-poster">
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={`${movie.Title} movie poster`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="poster-placeholder">
              <span aria-hidden="true">🎬</span>
              <span>Poster unavailable</span>
            </div>
          )}

          <span className="poster-type">{movie.Type}</span>
        </div>

        <div className="movie-card-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </button>
    </article>
  );
}

export default MovieCard;