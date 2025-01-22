import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Contenedor from "../../components/Contenedor";
import Stopwatch from "../../components/Cronometro/Stopwatch";
import Enlaces from "../../components/Enlaces";
import PreguntaDB from "/src/db.json";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import styles from "./Quizz.module.css";

const Quizz = () => {
  const { titulo } = useParams(); // Obtener el parámetro de la URL
  const preguntasFiltradas = PreguntaDB.quizz.filter(
    (pregunta) => pregunta.programa.toLowerCase() === titulo.toLowerCase()
  );

  const [key, setKey] = useState(0);
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [terminado, setTerminado] = useState(false);
  const [tiempoTotal, setTiempoTotal] = useState(0);
  const [running, setRunning] = useState(true);

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
      <Stopwatch key={key} running={running} onStop={setTiempoTotal} />
      <div className={styles.card}>
        {!terminado ? (
          preguntasFiltradas.length > 0 ? (
            <>
              <FormControl key={indice}>
                <FormLabel id="pregunta-label">
                  <p className={styles.heading}>
                    {preguntasFiltradas[indice].pregunta}
                  </p>
                </FormLabel>
                <RadioGroup
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

              <button
                className={`${styles.btn} ${styles["btn-siguiente"]}`}
                onClick={manejarRespuesta}
                disabled={!respuestaSeleccionada}
              >
                Siguiente <NavigateNextIcon />
              </button>
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
            <Enlaces url={"../"}>
              <button className={`${styles.btn} ${styles["btn-regresar"]}`}>
                Regresar Inicio <ArrowBackIosIcon />
              </button>
            </Enlaces>
          </>
        )}
        <button
          className={`${styles.btn} ${styles["btn-repeat"]}`}
          onClick={repetirCuestionario}
        >
          Volver a intentar <ReplayIcon />
        </button>
      </div>
    </Contenedor>
  );
};

export default Quizz;
