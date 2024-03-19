import React,{useState} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";
import useAuth from "../hooks/authHooks";
import { useNavigate,Link } from "react-router-dom";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #131324;
  color: white;
  overflow-x: hidden;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  img {
    height: 5rem;
  }
`;

const SidebarTitle = styled.h1`
  color: white;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 0;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const SidebarMenuItem = styled.li`
  padding: 10px 20px;
  margin: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button {
    color: inherit;
    font-weight: bold;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const Sidebar = () => {
  const [activeItem, setActiveItem] = React.useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate()
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
 
  return (
    <SidebarContainer>
       <SidebarHeader>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <SidebarTitle>Teclab</SidebarTitle>
      </SidebarHeader>
      <SidebarMenu>
        {auth.idTipoUsuario === 5 && (
          <SidebarMenuItem
            onClick={() => handleItemClick("Análisis")}
            isActive={activeItem === "Análisis"}
          >
            <button onClick={() => navigate("/medico")}>Análisis</button>
          </SidebarMenuItem>
        )}
        {auth.idTipoUsuario === 6 && (
          <SidebarMenuItem
            onClick={() => handleItemClick("Solicitudes")}
            isActive={activeItem === "Solicitudes"}
          >
            <button onClick={() => navigate("/responsable")}>Solicitudes</button>
          </SidebarMenuItem>
        )}
        {auth.idTipoUsuario === 7 && (
          <SidebarMenuItem
            onClick={() => handleItemClick("Solicitudes")}
            isActive={activeItem === "Solicitudes"}
          >
            <button onClick={() => navigate("/recepcionista")}>Solicitudes</button>
          </SidebarMenuItem>
        )}
        {auth.idTipoUsuario === 2 && (
          <SidebarMenuItem
            onClick={() => handleItemClick("Administracion de medicos")}
            isActive={activeItem === "Administracion de medicos"}
          >
            <button onClick={() => navigate("/medicos")}>Administracion de medicos</button>
          </SidebarMenuItem>
        )}
        {auth.idTipoUsuario === 1 && (
          <SidebarMenuItem
            onClick={() => handleItemClick("Administracion de centros")}
            isActive={activeItem === "Administracion de centros"}
          >
            <button onClick={() => navigate("/admin")}>Administracion de medicos</button>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
      <Logout />
    </SidebarContainer>
  );
};
export default Sidebar;
