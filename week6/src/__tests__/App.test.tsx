
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

const mockMovie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Type: "movie",
  Poster: "https://example.com/inception.jpg",
};

const mockFetch = vi.fn();

function createMockStorage() {
  const storage: Record<string, string> = {};

  return {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = String(value);
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  };
}

describe("App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal("fetch", mockFetch);
    vi.stubGlobal("localStorage", createMockStorage());
    vi.stubEnv("VITE_OMDB_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("renders the initial discovery screen", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /discover movies/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("searchbox", { name: /search movie titles/i })
    ).toBeInTheDocument();
  });

  it("shows an error when the search input is empty", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: /search movies/i })
    );

    expect(
      await screen.findByText(/enter a movie title/i)
    ).toBeInTheDocument();

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("displays movies returned by the API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: "True",
        Search: [mockMovie],
      }),
    });

    render(<App />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: /search movie titles/i }),
      { target: { value: "Inception" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /search movies/i })
    );

    expect(await screen.findByText("Inception")).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("shows an error when the API request fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: /search movie titles/i }),
      { target: { value: "Inception" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /search movies/i })
    );

    expect(
      await screen.findByText(/something went wrong while searching/i)
    ).toBeInTheDocument();
  });
});