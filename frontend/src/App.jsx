import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import FormAnalisys from "./components/FormAnalisys";
import RecepcionistaPage from "./pages/RecepcionistaPage";
import ResponsablePage from "./pages/ResponsablePage";
import FormResponsable from "./components/FormResponsable";
import FormAsignar from "./components/FormAsignar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/analisys" element={<FormAnalisys />} />
          <Route path="/analisys/:id" element={<FormAnalisys />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/recepcionista" element={<RecepcionistaPage />} />
          <Route path="/recepcionista/asignar" element={<FormAsignar />} />
          <Route path="/responsable" element={<ResponsablePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
