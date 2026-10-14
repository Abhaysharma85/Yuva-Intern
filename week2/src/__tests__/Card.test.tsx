import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import { describe, test, expect } from "vitest";

describe("Card component", () => {
  test("renders children content inside card", () => {
    render(
      <Card>
        <p>Card body content</p>
      </Card>
    );
    expect(screen.getByText("Card body content")).toBeInTheDocument();
  });

  test("renders title heading when title prop is provided", () => {
    render(
      <Card title="Featured Movie">
        <p>Movie details</p>
      </Card>
    );
    expect(screen.getByRole("heading", { name: "Featured Movie" })).toBeInTheDocument();
  });

  test("applies ui-card class and custom className", () => {
    const { container } = render(
      <Card className="custom-highlight">
        <span>Content</span>
      </Card>
    );
    const cardEl = container.firstChild as HTMLElement;
    expect(cardEl).toHaveClass("ui-card");
    expect(cardEl).toHaveClass("custom-highlight");
  });
});
