import { createContext, useState, useContext, useEffect } from 'react';
const apiURL = import.meta.env.VITE_API_URL;


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
  const signup = async (name, email, password, confirmPassword) => {
    try {
    const response = await fetch(`${apiURL}/admin-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration successful, handle response
      console.log(data);
      return data;
    } else {
      // Handle error
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
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