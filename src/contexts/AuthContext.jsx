import { createContext, useState, useContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@lotopital.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Admin User',
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          // Remove password from user object
          const { password, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate network delay
    });
  };
  
  // Register function
  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        
        if (existingUser) {
          reject(new Error('Email already in use'));
        } else {
          // In a real app, you would send this to your backend
          // and the backend would create the user
          const newUser = {
            id: (MOCK_USERS.length + 1).toString(),
            email,
            password, // In real app, this would be hashed
            name,
          };
          
          MOCK_USERS.push(newUser);
          
          // Remove password from returned user object
          const { password: _, ...userWithoutPassword } = newUser;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        }
      }, 1000); // Simulate network delay
    });
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  // Reset password function (mock)
  const resetPassword = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find((u) => u.email === email);
        
        if (user) {
          resolve(true);
        } else {
          reject(new Error('User not found'));
        }
      }, 1000);
    });
  };
  
  // Update password function (mock)
  const updatePassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = MOCK_USERS.findIndex((u) => u.email === email);
        
        if (userIndex !== -1) {
          MOCK_USERS[userIndex].password = password;
          resolve(true);
        } else {
          reject(new Error('User not found'));
        }
      }, 1000);
    });
  };
  
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    loading,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};