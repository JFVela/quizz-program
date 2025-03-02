// Routes.jsx
import { Routes, Route } from "react-router-dom";
import PaginaBase from "./Pages/PaginaBase";
import Inicio from "./Pages/Inicio";
import Quizz from "./Pages/Quizz";
import Error404 from "./Pages/Error404";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Clasificacion from "./Pages/Clasificacion";

// Rutas de Admin
import AdminLayout from "./Pages/admin"; // Layout principal del Admin
import Perfil from "./Pages/admin/Perfil";
import Confi from "./Pages/admin/Configuracion";
import Dashboard from "./Pages/admin/Dashboard";
import Actividad from "./Pages/admin/Actividad";
import Notificaciones from "./Pages/admin/Notificaciones";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Inicio />} />
        <Route path="quizz/:titulo" element={<Quizz />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="clasificacion" element={<Clasificacion />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="profile" element={<Perfil />} />
        <Route path="settings" element={<Confi />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activity" element={<Actividad />} />
        <Route path="notifications" element={<Notificaciones />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
