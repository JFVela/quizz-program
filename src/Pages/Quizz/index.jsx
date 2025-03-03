import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Contenedor from "../../components/Contenedor";
import Stopwatch from "../../components/Cronometro/Stopwatch";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./Quizz.module.css";
import TerminalIcon from "@mui/icons-material/Terminal";

const Quizz = () => {
  const { titulo } = useParams(); // Obtener el parámetro de la URL

  // Estado para almacenar los datos del JSON remoto
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para el cuestionario
  const [key, setKey] = useState(0);
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [terminado, setTerminado] = useState(false);
  const [tiempoTotal, setTiempoTotal] = useState(0);
  const [running, setRunning] = useState(true);

  const navigate = useNavigate();

  // Fetch de la base de datos desde la API
  useEffect(() => {
    const fetchDb = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/JFVela/api-quizz-program/db"
        );
        const jsonData = await response.json();
        setDb(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchDb();
  }, []);

  // Mientras se carga, mostrar un mensaje de espera
  if (loading) {
    return <div>Cargando cuestionario...</div>;
  }

  // Filtrar las preguntas según el programa (titulo) de la URL
  const preguntasFiltradas =
    db && db.quizz
      ? db.quizz.filter(
          (pregunta) => pregunta.programa.toLowerCase() === titulo.toLowerCase()
        )
      : [];

  // Manejar respuesta seleccionada y puntaje
  const manejarRespuesta = () => {
    if (
      respuestaSeleccionada === preguntasFiltradas[indice].respuesta_correcta
    ) {
      setPuntos((prevPuntos) => prevPuntos + 100);
    }

    if (indice < preguntasFiltradas.length - 1) {
      setIndice((prevIndice) => prevIndice + 1);
      setRespuestaSeleccionada(""); // Reiniciar la selección
    } else {
      setTerminado(true);
      setRunning(false);
    }
  };

  // Reiniciar cuestionario
  const repetirCuestionario = () => {
    setIndice(0);
    setPuntos(0);
    setTerminado(false);
    setRespuestaSeleccionada("");
    setTiempoTotal(0);
    setRunning(true);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <Contenedor>
      <div className={styles.card}>
        {!terminado ? (
          preguntasFiltradas.length > 0 ? (
            <>
              <FormControl sx={{ width: "100%" }} key={indice}>
                <FormLabel id="pregunta-label">
                  <p className={styles.tituloPregunta}>
                    <TerminalIcon />
                    Quizz de Programación
                  </p>
                  <p className={styles.heading}>
                    {preguntasFiltradas[indice].pregunta}
                  </p>
                </FormLabel>
                <RadioGroup
                  className={styles.radioGroup}
                  aria-labelledby="pregunta-label"
                  name="radio-buttons-group"
                  value={respuestaSeleccionada}
                  onChange={(e) => setRespuestaSeleccionada(e.target.value)}
                >
                  {["a", "b", "c"].map((opcion) => (
                    <FormControlLabel
                      key={opcion}
                      value={opcion}
                      control={<Radio color="success" />}
                      label={preguntasFiltradas[indice][opcion]}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <div className={styles.grupoBotones}>
                <button
                  className={`${styles.btn} ${styles["btn-siguiente"]}`}
                  onClick={manejarRespuesta}
                  disabled={!respuestaSeleccionada}
                >
                  Siguiente <NavigateNextIcon />
                </button>
                <button
                  className={`${styles.btn} ${styles["btn-repeat"]}`}
                  onClick={repetirCuestionario}
                >
                  Repetir
                  <ReplayIcon />
                </button>
              </div>
            </>
          ) : (
            <p>No hay preguntas disponibles para este programa.</p>
          )
        ) : (
          <>
            <h2>
              Puntaje total:{" "}
              {Math.max(0, puntos - Math.floor(tiempoTotal / 1000) * 0.5)}
            </h2>
            <h3>Tiempo total: {Math.floor(tiempoTotal / 1000)} segundos</h3>
            <div className={styles.grupoBotones}>
              <button
                onClick={() => navigate("../")}
                className={`${styles.btn} ${styles["btn-regresar"]}`}
              >
                Regresar Inicio <ArrowBackIosIcon />
              </button>
              <button
                className={`${styles.btn} ${styles["btn-repeat"]}`}
                onClick={repetirCuestionario}
              >
                Repetir
                <ReplayIcon />
              </button>
            </div>
          </>
        )}
        <div className={styles.tiempos}>
          <p>Tiepo:</p>
          <Stopwatch key={key} running={running} onStop={setTiempoTotal} />
        </div>
      </div>
    </Contenedor>
  );
};

export default Quizz;
