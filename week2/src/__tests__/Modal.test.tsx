import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal";
import { describe, test, expect, vi } from "vitest";

describe("Modal component", () => {
  test("does not render dialog when isOpen is false", () => {
    render(
      <Modal isOpen={false} title="Test Modal" onClose={() => {}}>
        <p>Modal Body</p>
      </Modal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renders dialog, title, and children when isOpen is true", () => {
    render(
      <Modal isOpen={true} title="Movie Overview" onClose={() => {}}>
        <p>In-depth movie description</p>
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("heading", { name: "Movie Overview" })).toBeInTheDocument();
    expect(screen.getByText("In-depth movie description")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} title="Quick Preview" onClose={handleClose}>
        <p>Preview details</p>
      </Modal>
    );
    const closeBtn = screen.getByRole("button", { name: "Close dialog" });
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when Escape key is pressed", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} title="Keyboard Test" onClose={handleClose}>
        <p>Press Esc to close</p>
      </Modal>
    );
    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
