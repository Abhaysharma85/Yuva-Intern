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
  return (
    <button
      className="movie-card"
      type="button"
      onClick={() => onSelect(movie.imdbID)}
    >
      <div className="movie-poster">
        {movie.Poster !== "N/A" ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        ) : (
          <div className="no-poster">No Poster</div>
        )}
      </div>

      <div className="movie-info">
        <h2>{movie.Title}</h2>

        <div className="movie-meta">
          <span>{movie.Year}</span>
          <span>{movie.Type}</span>
        </div>
      </div>
    </button>
  );
}

export default MovieCard;