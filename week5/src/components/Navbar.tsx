function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          🎬 Movie Explorer
        </div>

        <nav>
          <a href="#">Home</a>
          <a href="#movies">Movies</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;