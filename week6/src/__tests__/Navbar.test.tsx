import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { describe, test, expect } from "vitest";

describe("Navbar", () => {
  test("displays the Movie Explorer logo", () => {
    render(<Navbar />);

    expect(screen.getByText(/Movie Explorer/i)).toBeInTheDocument();
  });

  test("displays Home and Movies navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Movies" })).toBeInTheDocument();
  });

  test("has the correct navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "#"
    );

    expect(screen.getByRole("link", { name: "Movies" })).toHaveAttribute(
      "href",
      "#movies"
    );
  });
});