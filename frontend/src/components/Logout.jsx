import React from "react";
import {useNavigate} from "react-router-dom"

function Logout() {
  const navigate = useNavigate();
  if (!localStorage) {
    navigate("/");
  }

  return (
    <>
      <button> Cerrar sesion</button>
    </>
  );
}

export default Logout;
