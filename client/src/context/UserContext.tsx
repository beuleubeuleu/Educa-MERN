import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService                                                        from "../services/AuthService";
import { utilisateurType }                                       from "../types/utilisateurType.ts";

type contextProps = {
  children: React.ReactNode
}

type UserContextType = {
  user: utilisateurType | null;
  isLoading: boolean
  checkUserData(): void
  logout(): void
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading:true,
  checkUserData(): void {},
  logout(): void {}
});

export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }: contextProps) => {
  const [user, setUser] = useState<utilisateurType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function checkUserData(): Promise<any> {
    try {
      const loggedInUser = await AuthService.getLoggedInUser();
      setUser(loggedInUser.data.utilisateur);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false)
    }
  }

  function logout(): void {
    AuthService.logout()
    setUser(null)
  }

  useEffect(() => {
    checkUserData()
  }, []);

  return (
      <UserContext.Provider value={ { user, isLoading, checkUserData, logout } }>
        { children }
      </UserContext.Provider>
  );
};

export default UserProvider;