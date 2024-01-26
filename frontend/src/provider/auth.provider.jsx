import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { getMeRoute } from "../utils/APIroute";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const {data} = await axios.get(getMeRoute, config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
