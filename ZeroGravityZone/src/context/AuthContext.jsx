
// import { createContext, useContext, useState, useEffect } from 'react';

// // Create the context
// const AuthContext = createContext();

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); 
//   const [isAuthenticated, setIsAuthenticated] = useState(false); 
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const checkAuth = async () => {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//         setIsAuthenticated(true);
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);

//   // Login function
//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     localStorage.setItem('user', JSON.stringify(userData)); // Persist user
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('user'); // Clear storage
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         loading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// src/context/AuthContext.jsx


import React, { createContext, useState,  useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Restore user from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
