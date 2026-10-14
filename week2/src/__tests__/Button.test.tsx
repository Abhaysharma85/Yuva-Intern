import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";
import { describe, test, expect, vi } from "vitest";

describe("Button component", () => {
  test("renders button with text content", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: "Click Me" })).toBeInTheDocument();
  });

  test("applies primary variant class by default", () => {
    render(<Button>Submit</Button>);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toHaveClass("ui-button");
    expect(btn).toHaveClass("ui-button--primary");
  });

  test("applies secondary variant class when specified", () => {
    render(<Button variant="secondary">Cancel</Button>);
    const btn = screen.getByRole("button", { name: "Cancel" });
    expect(btn).toHaveClass("ui-button");
    expect(btn).toHaveClass("ui-button--secondary");
  });

  test("handles onClick callback when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Action</Button>);
    await user.click(screen.getByRole("button", { name: "Action" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("honors disabled attribute and prevents clicks", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
