
type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  title?: string;
  links?: NavLink[];
};

function Navbar({
  title = "Movie Explorer",
  links = [
    { label: "Home", href: "#" },
    { label: "Movies", href: "#movies" },
  ],
}: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a className="logo" href="/" aria-label={`${title} home`}>
          🎬 {title}
        </a>

        <nav aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
