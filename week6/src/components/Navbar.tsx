
type NavbarProps = {
  activeView?: "discover" | "watchlist";
  onViewChange?: (view: "discover" | "watchlist") => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
};

function Navbar({
  activeView = "discover",
  onViewChange = () => {},
  onLoginClick = () => {},
  onSignupClick = () => {},
}: NavbarProps) {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a
          className="brand"
          href="#home"
          onClick={() => onViewChange("discover")}
          aria-label="Movie Explorer home"
        >
          <span className="brand-icon" aria-hidden="true">M</span>
          <span>movie explorer</span>
          <span className="brand-period" aria-hidden="true">.</span>
        </a>

        <div className="nav-links">
          <button
            className={`nav-link ${activeView === "discover" ? "active" : ""}`}
            type="button"
            onClick={() => onViewChange("discover")}
            aria-current={activeView === "discover" ? "page" : undefined}
          >
            Discover
          </button>

          <button
            className={`nav-link ${activeView === "watchlist" ? "active" : ""}`}
            type="button"
            onClick={() => onViewChange("watchlist")}
            aria-current={activeView === "watchlist" ? "page" : undefined}
          >
            Watchlist
          </button>
        </div>

        <div className="nav-actions">
          <button className="login-link" type="button" onClick={onLoginClick}>
            Log in
          </button>
          <button className="signup-link" type="button" onClick={onSignupClick}>
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;