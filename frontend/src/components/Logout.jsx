import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/authHooks";

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </>
  );
}

export default Logout;
