import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";

import { getUser } from "../api";

export default function Profile() {
  const { username } = useParams();
  const { user } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState({});
  console.log(username);
  console.log(user.username);
  useEffect(() => {
    if (user.username !== username) {
      console.log("getting user", username);
      getUser(username).then((fetchedUser) => {
        setProfileUser(fetchedUser);
      });
    } else {
      setProfileUser(user);
    }
  });
  return (
    <section className="user-card">
      <h2>{profileUser.username}</h2>
      <img
        className="user-profile-img"
        width="300"
        src={profileUser.avatar_url}
        alt={`${profileUser.username} profile`}
      />
    </section>
  );
}
