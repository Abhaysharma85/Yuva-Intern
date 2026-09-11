export default function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <h1>My UI Library</h1>

      <a href="#" style={{ marginRight: "15px" }}>
        Home
      </a>

      <a href="#" style={{ marginRight: "15px" }}>
        About
      </a>

      <a href="#">
        Contact
      </a>
    </nav>
  );
}