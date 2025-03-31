import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const guest = {
    username: "guest",
    name: "Guest User",
    avatar_url:
      "https://static.wikia.nocookie.net/roblox/images/f/f2/Roblox_guest.png/revision/latest/scale-to-width-down/352?cb=20180914191123",
  };
  const [user, setUser] = useState(guest);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
