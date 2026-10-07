import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieCard from "../components/MovieCard";
import { describe, expect, test, vi } from "vitest";

describe("MovieCard", () => {
  const movie = {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://example.com/inception.jpg",
  };

  test("displays movie information correctly", () => {
    render(<MovieCard movie={movie} onSelect={() => {}} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("movie")).toBeInTheDocument();
    expect(screen.getByAltText("Inception poster")).toBeInTheDocument();
  });

  test("calls onSelect with the movie IMDb ID when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<MovieCard movie={movie} onSelect={onSelect} />);

    await user.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledWith("tt1375666");
  });

  test("shows No Poster when poster is not available", () => {
    const movieWithoutPoster = {
      ...movie,
      Poster: "N/A",
    };

    render(
      <MovieCard movie={movieWithoutPoster} onSelect={() => {}} />
    );

    expect(screen.getByText("No Poster")).toBeInTheDocument();
  });
});