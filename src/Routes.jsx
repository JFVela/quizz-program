import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaBase from "./Pages/PaginaBase";
import Inicio from "./Pages/Inicio";
import Quizz from "./Pages/Quizz";
import Error404 from "./Pages/Error404";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<Inicio />} />
          <Route path="quizz/:titulo" element={<Quizz />} />  {/* Ruta dinámica */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
