
function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Movie Explorer home">
          <span className="brand-icon" aria-hidden="true">
            M
          </span>
          <span>movie explorer</span>
          <span className="brand-period" aria-hidden="true">
            .
          </span>
        </a>

        <div className="nav-links">
          <a className="nav-link active" href="/" aria-current="page">
            Home
          </a>
          <a className="nav-link" href="#discover">
            Discover
          </a>
          <a className="nav-link" href="#watchlist">
            Watchlist
          </a>
        </div>

        <div className="nav-actions">
          <a className="login-link" href="#login">
            Log in
          </a>
          <a className="signup-link" href="#signup">
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;