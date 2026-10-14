import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../components/Input";
import { describe, test, expect, vi } from "vitest";

describe("Input component", () => {
  test("renders label and associates with input via htmlFor", () => {
    render(<Input label="Search Movies" placeholder="Enter title..." />);
    const label = screen.getByText("Search Movies");
    const input = screen.getByPlaceholderText("Enter title...");
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "search-movies");
    expect(input).toHaveAttribute("id", "search-movies");
  });

  test("uses explicit id when provided", () => {
    render(<Input label="Email Address" id="custom-email-id" />);
    const label = screen.getByText("Email Address");
    const input = screen.getByLabelText("Email Address");
    expect(label).toHaveAttribute("for", "custom-email-id");
    expect(input).toHaveAttribute("id", "custom-email-id");
  });

  test("accepts input text and triggers onChange", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Query" onChange={handleChange} />);
    const input = screen.getByLabelText("Query");
    await user.type(input, "Avatar");
    expect(handleChange).toHaveBeenCalled();
  });
});
