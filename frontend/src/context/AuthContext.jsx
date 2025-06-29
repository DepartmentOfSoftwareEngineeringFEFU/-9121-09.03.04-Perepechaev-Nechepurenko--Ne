
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    
    if (username === 'admin' && password === 'admin123') {
      setUser({ username: 'admin', role: 'admin' });
      return true;
    }
    if (username === 'user' && password === 'user123') {
      setUser({ username: 'user', role: 'user' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};