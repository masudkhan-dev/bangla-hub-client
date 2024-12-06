import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading (replace this with your actual initialization logic)
    const initializeApp = async () => {
      try {
        // Perform any initial setup like checking authentication,
        // fetching initial data, etc.
        // For example:
        // await checkAuthStatus();
        // await fetchInitialData();

        // Once everything is ready, set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Initialization error", error);
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const authInfo = {
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
