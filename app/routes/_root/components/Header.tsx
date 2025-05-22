import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
    </header>
  );
}

export default Header;
