import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import FormAnalisys from "./components/FormAnalisys";
import RecepcionistaPage from "./pages/RecepcionistaPage";
import ResponsablePage from "./pages/ResponsablePage";
import FormResponsable from "./components/FormResponsable";
import FormAsignar from "./components/FormAsignar";
import FormSubir from "./components/FormSubir";
import FormVer from "./components/FormVer";
import { AuthProvider } from "./provider/auth.provider";
import RegisterDoctor from "./pages/registerDoctor";
import RegisterCenter from "./pages/registerCenter";
import MedicoPage from "./pages/MedicoPage";
import { useEffect } from "react";


function App() {


  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/analisys" element={<FormAnalisys />} />
          <Route path="/analisys/:id" element={<FormAnalisys />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/medico" element={<MedicoPage />} />
          <Route path="/recepcionista" element={<RecepcionistaPage />} />
          <Route path="/recepcionista/asignar/:id" element={<FormAsignar />} />
          <Route path="/responsable" element={<ResponsablePage />} />
          <Route path="/responsable/subir/:id" element={<FormSubir />} />
          <Route path="/analisysVer/ver/:id" element={<FormVer />} />
          <Route path="/registerDoctor" element={<RegisterDoctor />} />
          <Route path="/registerCenter" element={<RegisterCenter />} />
          <Route path="/admin" element={<RegisterCenter />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
