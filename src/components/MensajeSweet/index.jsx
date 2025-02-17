import Swal from "sweetalert2";

function MensajeSweet({ pos, ico, tit, vis, tie }) {
  // Arrays para la posición
  const opciones = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const posiciones = [
    "top",
    "top-start",
    "top-end",
    "center",
    "center-start",
    "center-end",
    "bottom",
    "bottom-start",
    "bottom-end",
  ];

  // Obtener la posición según la opción
  const index = opciones.indexOf(pos);
  const posicion = index !== -1 ? posiciones[index] : "top-end";

  // Definir el tipo de ícono
  const iconTypes = {
    1: "success",
    2: "error",
    3: "warning",
  };
  const iconType = iconTypes[ico] || "success";

  // Determinar si el botón de confirmación se muestra
  const visible = vis === "T";

  // Convertir tiempo a milisegundos
  const tiempo = tie * 1000;

  // Mostrar alerta
  Swal.fire({
    position: posicion,
    icon: iconType,
    title: tit,
    showConfirmButton: visible,
    timer: tiempo,
  });

  return null; // No renderiza nada en el DOM
}

export default MensajeSweet;
