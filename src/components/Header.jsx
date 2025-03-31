import { UserContext } from "../contexts/User";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <header>
      <button>Nav</button>
      <Link to="/">
        <h1>SHEEPLE</h1>
        <h3>We tell you your opinions for you</h3>
      </Link>
      <img
        className="profile-thumbnail"
        src={user.avatar_url}
        width="100px"
        height="100px"
      />
    </header>
  );
}
