import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function Profile() {
  const { username } = useParams();

  return <p>This is the profile of {username}</p>;
}
