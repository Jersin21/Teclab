import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/authHooks";
import styled from "styled-components";

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid white;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

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
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
    </>
  );
}

export default Logout;
