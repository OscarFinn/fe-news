import { UserContext } from "../contexts/User";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 80;
      const isScrolled = window.scrollY > scrollThreshold;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <header className={scrolled ? "header-scrolled" : ""}>
      <button className="nav-menu">Nav</button>
      <Link to="/">
        <h1 id="header-main" data-text={"THE NEWS FRONTIER"}>
          THE NEWS FRONTIER
        </h1>
      </Link>

      <div className="header-links">
        <Link to="/submit">
          <button id="add-article" onClick={() => {}}>
            +
          </button>
        </Link>
        <Link to={`/user/${user.username}`}>
          <img
            className="profile-thumbnail"
            src={user.avatar_url}
            width="100px"
            height="100px"
          />
        </Link>
      </div>
    </header>
  );
}
