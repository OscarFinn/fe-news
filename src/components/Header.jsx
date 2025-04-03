import { UserContext } from "../contexts/User";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBurger from "../assets/navBurger.svg?react";

export default function Header({ setSidebarOpen }) {
  const { user } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 60;
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
      <button className="nav-menu" onClick={() => setSidebarOpen(true)}>
        <NavBurger />
      </button>
      <Link to="/">
        <h1 id="header-main" data-text={"THE NEWS FRONTIER"}>
          THE NEWS FRONTIER
        </h1>
      </Link>

      <div className="header-links">
        <Link to="/submit">
          <button id="add-article">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <line
                x1="50"
                y1="10"
                x2="50"
                y2="90"
                stroke="currentColor"
                stroke-width="12"
              />
              <line
                x1="10"
                y1="50"
                x2="90"
                y2="50"
                stroke="currentColor"
                stroke-width="12"
              />
            </svg>
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
