import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const guest = {
    username: "guest",
    name: "Guest User",
    avatar_url:
      "https://preview.redd.it/is-oscar-the-grouch-based-on-diogenes-the-cynic-philosopher-v0-vhczzza57ohd1.jpeg?auto=webp&s=5c6f0a05d0c9ea07161d7069f031d89fe549ddc3",
  };

  const [user, setUser] = useState(guest);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
