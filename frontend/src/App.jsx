import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
