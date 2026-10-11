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
      // Send the selected movie's IMDb ID to the parent component
      // so its full details can be fetched from the API.
      onClick={() => onSelect(movie.imdbID)}
    >
      <div className="movie-poster">
        {movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            // Posters are loaded only when they are close to being visible,
            // which helps reduce unnecessary image loading.
            loading="lazy"
          />
        ) : (
          // OMDb sometimes does not provide a poster for a movie.
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