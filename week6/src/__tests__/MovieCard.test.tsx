
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../components/MovieCard";

const movie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Type: "movie",
  Poster: "https://example.com/inception.jpg",
};

describe("MovieCard", () => {
  it("renders the movie title", () => {
    render(
      <MovieCard
        movie={movie}
        onSelect={vi.fn()}
        isSaved={false}
        onToggleSave={vi.fn()}
      />
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("calls onSelect when the details button is clicked", () => {
    const onSelect = vi.fn();

    render(
      <MovieCard
        movie={movie}
        onSelect={onSelect}
        isSaved={false}
        onToggleSave={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /details/i }));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});