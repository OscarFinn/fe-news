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
        <h1>Good News, Everyone!</h1>
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
