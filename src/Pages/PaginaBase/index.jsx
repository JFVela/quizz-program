import { Outlet } from "react-router-dom";
import Cabecera from "../../components/Cabecera";
import Pie from "../../components/Pie";

function PaginaBase() {
  return (
    <>
      <Cabecera />
      <Outlet />
      <Pie />
    </>
  );
}

export default PaginaBase;
