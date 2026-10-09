import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
const defaultProps = {
activeView: "discover" as const,
onViewChange: vi.fn(),
currentUser: "",
onLoginClick: vi.fn(),
onSignupClick: vi.fn(),
onLogoutClick: vi.fn(),
isDarkMode: false,
onThemeToggle: vi.fn(),
};

it("renders the Movie Explorer logo", () => {
render(<Navbar {...defaultProps} />);
expect(screen.getByText("M")).toBeInTheDocument();
});

it("shows login and signup when no user is logged in", () => {
render(<Navbar {...defaultProps} />);
expect(screen.getByText("Log in")).toBeInTheDocument();
expect(screen.getByText("Sign up")).toBeInTheDocument();
});

it("shows the user email and logout when logged in", () => {
render(
<Navbar
{...defaultProps}
currentUser="[test@example.com](mailto:test@example.com)"
/>
);



});
});
