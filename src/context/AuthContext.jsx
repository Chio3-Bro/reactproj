import { createContext, useState, useEffect } from "react";
import { loginRequest, getMeRequest } from "../api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const currentUser = await getMeRequest(token);
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to fetch user", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const loginData = await loginRequest(credentials);
    const newToken = loginData.accessToken;
    setToken(newToken);
    localStorage.setItem("token", newToken);

    const currentUser = await getMeRequest(newToken);
    setUser(currentUser);

    return currentUser;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Або інший індикатор завантаження
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
