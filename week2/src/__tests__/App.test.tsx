import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { describe, beforeEach, vi, test, expect } from "vitest";

describe("App integration tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("shows an error when searching without entering a movie name", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(
      screen.getByText("Please enter a movie name.")
    ).toBeInTheDocument();
  });

  test("searches for a movie and displays the movie card", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => ({
        Response: "True",
        Search: [
          {
            Title: "Inception",
            Year: "2010",
            imdbID: "tt1375666",
            Type: "movie",
            Poster: "https://example.com/inception.jpg",
          },
        ],
      }),
    } as Response);

    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search for a movie..."
    );

    await user.type(searchInput, "Inception");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(await screen.findByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("movie")).toBeInTheDocument();
  });

  test("displays movie details when a movie card is selected", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        json: async () => ({
          Response: "True",
          Search: [
            {
              Title: "Inception",
              Year: "2010",
              imdbID: "tt1375666",
              Type: "movie",
              Poster: "https://example.com/inception.jpg",
            },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        json: async () => ({
          Response: "True",
          Title: "Inception",
          Year: "2010",
          Poster: "https://example.com/inception.jpg",
          Plot: "A skilled thief enters people's dreams.",
          Genre: "Action, Sci-Fi",
          Runtime: "148 min",
          Director: "Christopher Nolan",
          Actors: "Leonardo DiCaprio",
          imdbRating: "8.8",
        }),
      } as Response);

    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search for a movie..."
    );

    await user.type(searchInput, "Inception");
    await user.click(screen.getByRole("button", { name: "Search" }));

    const movieCard = await screen.findByRole("button", {
      name: /Inception/i,
    });

    await user.click(movieCard);

    const modal = await screen.findByRole("button", {
      name: "Close movie details",
    });

    const movieDetails = modal.closest(".movie-details");

    expect(movieDetails).toBeInTheDocument();

    const modalContent = within(movieDetails as HTMLElement);

    expect(
      modalContent.getByRole("heading", { name: "Inception" })
    ).toBeInTheDocument();

    expect(modalContent.getByText("2010")).toBeInTheDocument();
    expect(modalContent.getByText("Action, Sci-Fi")).toBeInTheDocument();
    expect(modalContent.getByText("148 min")).toBeInTheDocument();
    expect(
  modalContent.getByText(/8\.8/)
  
  

).toBeInTheDocument();
    expect(modalContent.getByText("Christopher Nolan")).toBeInTheDocument();
    expect(modalContent.getByText("Leonardo DiCaprio")).toBeInTheDocument();
    expect(
      modalContent.getByText("A skilled thief enters people's dreams.")
    ).toBeInTheDocument();
  });
    test("closes the movie details modal when the close button is clicked", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        json: async () => ({
          Response: "True",
          Search: [
            {
              Title: "Inception",
              Year: "2010",
              imdbID: "tt1375666",
              Type: "movie",
              Poster: "https://example.com/inception.jpg",
            },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        json: async () => ({
          Response: "True",
          Title: "Inception",
          Year: "2010",
          Poster: "https://example.com/inception.jpg",
          Plot: "A skilled thief enters people's dreams.",
          Genre: "Action, Sci-Fi",
          Runtime: "148 min",
          Director: "Christopher Nolan",
          Actors: "Leonardo DiCaprio",
          imdbRating: "8.8",
        }),
      } as Response);

    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search for a movie..."
    );

    await user.type(searchInput, "Inception");
    await user.click(screen.getByRole("button", { name: "Search" }));

    const movieCard = await screen.findByRole("button", {
      name: /Inception/i,
    });

    await user.click(movieCard);

    const closeButton = await screen.findByRole("button", {
      name: "Close movie details",
    });

    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(
      screen.queryByRole("button", {
        name: "Close movie details",
      })
    ).not.toBeInTheDocument();
  });

  test("shows an error message when the movie search API fails", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search for a movie..."
    );

    await user.type(searchInput, "Inception");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(
  await screen.findByText("Something went wrong. Please try again.")
).toBeInTheDocument();
  });
});