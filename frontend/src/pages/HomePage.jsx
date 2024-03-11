import React from 'react';
import Sidebar from '../components/Sidebar';
import useAuth from "../hooks/authHooks";
import styled from 'styled-components';

const HomepageContainer = styled.div`
  display: flex;
  height: 100vh; 
  background-color: #1a1a2e;
  overflow-x: hidden;
  padding: 20px; 
  margin-left: 250px; 
  color: white;
`;

const ContentContainer = styled.div`
  flex: 1; 
`;

export default function Homepage() {
  const { auth } = useAuth();

  return (
    <>
      <HomepageContainer>
        <Sidebar />
        <ContentContainer>
          <h1>Bienvenido {auth.username}</h1>
        </ContentContainer>
      </HomepageContainer>
    </>
  );
}
