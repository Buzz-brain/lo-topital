import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasFetchedOnce = useRef(false);
  const location = useLocation();

  // --- Lock to prevent multiple refresh calls ---
  let isRefreshing = false;

  // Refresh Access Token
  const refreshToken = async () => {
    if (isRefreshing) return null;
    isRefreshing = true;

    try {
      const response = await fetch(`${apiURL}/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return data.accessToken;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Refresh token error:", err.message);
      return null;
    } finally {
      isRefreshing = false;
    }
  };

  const logout = async () => {
  try {
    const response = await fetch(`${apiURL}/admin-logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    // Just return, don't set user here
    return data;
  } catch (error) {
    throw error;
  }
};

  // Wrapper for authenticated fetch requests
  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401) {
      const newToken = await refreshToken();

      if (newToken) {
        // Retry with new access token
        return await fetch(url, {
          ...options,
          credentials: "include",
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      } else {
        setCurrentUser(null);
        return res;
      }
    }
    return res;
  };

  const fetchUserDetails = async () => {
    try {
      const response = await authFetch(`${apiURL}/get-user-details`);

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      console.log(err.message, apiURL)
      console.error("Failed to fetch user:", err.message);
      setCurrentUser(null);
    } 
  };

  useEffect(() => {
  const initializeAuth = async () => {
    try {
      setLoading(true);
      await fetchUserDetails();
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (!hasFetchedOnce.current) {
    hasFetchedOnce.current = true;
    initializeAuth();
  }
}, []);


  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${apiURL}/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        await fetchUserDetails();
        // Login successful, handle the response
        return data;
      } else {
        // Login failed, throw an error
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const signup = async (name, email, password, confirmPassword) => {
    try {
      const response = await fetch(`${apiURL}/admin-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, handle response
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

  // Forgot Password function
  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${apiURL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (token, password) => {
    try {
      const response = await fetch(`${apiURL}/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    loading,
    authFetch,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
