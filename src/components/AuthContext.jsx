import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={ {user, setUser, isAuthenticated, setIsAuthenticated} }>
      {children}
    </AuthContext.Provider>
  );
}
