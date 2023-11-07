import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import Logout from "./Logout";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #131324;
  color: white;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "4px 0px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
  z-index: 1000;
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
  margin: 5px 10px 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: ${({ isActive }) => (isActive ? '#4e0eff' : 'transparent')};
  border-radius: 10px;
  border: 2px solid white;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? '#4e0eff' : 'rgba(255, 255, 255, 0.1)'};
  }

  a {
    color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};
    text-decoration: none;
    font-weight: bold;
    width: 100%;
  }
`;




const Sidebar = ({ isOpen }) => {
    const [activeItem, setActiveItem] = useState(null);
  
    const handleItemClick = (item) => {
      setActiveItem(item);
    };
  
    return (
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <img src={Logo} alt="Logo" />
          <SidebarTitle>Santa Fe</SidebarTitle>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            onClick={() => handleItemClick('Doctores')}
            isActive={activeItem === 'Doctores'}
          >
            Doctores
          </SidebarMenuItem>
          <SidebarMenuItem
            onClick={() => handleItemClick('Análisis')}
            isActive={activeItem === 'Análisis'}
          >
            Análisis
          </SidebarMenuItem>
          <SidebarMenuItem
            onClick={() => handleItemClick('Reportes')}
            isActive={activeItem === 'Reportes'}
          >
            Reportes
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContainer>
    );
  };
  

export default Sidebar;
