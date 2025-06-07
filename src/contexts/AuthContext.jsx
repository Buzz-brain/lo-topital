import { createContext, useState, useContext, useEffect } from "react";
const apiURL = import.meta.env.VITE_API_URL;

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh Access Token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${apiURL}/refresh-token`, {
        method: "POST",
        credentials: "include", // this is key to send the refresh token cookie
      });

      if (response.ok) {
        const data = await response.json();
        return data.accessToken; // or whatever token your server returns
      } else {
        throw new Error("Unable to refresh token");
      }
    } catch (error) {
      console.error("Refresh token error:", error.message);
      return null;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await authFetch(`${apiURL}/admin-logout`, {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(null);
        // Logout successful, handle the response
        return data;
      } else {
        // Logout failed, throw an error
        throw new Error(data.message);
      }
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

    // If access token expired
    if (res.status === 401) {
      const newToken = await refreshToken();

      if (newToken) {
        const retryRes = await fetch(url, {
          ...options,
          credentials: "include",
        });
        return retryRes;
      } else {
        // If token refresh fails, logout
        await logout();
        return res;
      }
    }

    return res;
  };

  const fetchUserDetails = async () => {
    try {
      const res = await authFetch(`${apiURL}/get-user-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in
  useEffect(() => {
    fetchUserDetails();
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
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    loading,
    authFetch,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
