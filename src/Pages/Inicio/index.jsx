import styles from "./Inicio.module.css";
import Titulo from "../../components/Titulo";
import Boton from "../../components/Boton";
import Contenedor from "../../components/Contenedor";
import Subtitulo from "../../components/Subtitulo";
import Carta from "../../components/Carta";
import Enlaces from "../../components/Enlaces";

import { Container } from "@mui/material";
import { useEffect, useState } from "react";

function Inicio() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/JFVela/api-quizz-program/programas"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setProgramas(data);
        } else {
          console.error("El formato de los datos no es el esperado:", data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Contenedor>
        <Titulo>Pon a prueba tus habilidades de programación</Titulo>
        <Subtitulo>
          Desafía tu conocimiento en diferentes lenguajes y conceptos de
          programación.
        </Subtitulo>
        <Enlaces url={"/quizz"}>
          <Boton>Iniciar Quiz Aleatorio</Boton>
        </Enlaces>
      </Contenedor>
      <Container
        sx={{
          padding: "20px 10px",
          marginBottom: "50px",
        }}
      >
        <Titulo>Elije Tu lenguaje</Titulo>
        <div className={styles.contenedorCartas}>
          {programas.map((programa) => (
            <Carta
              key={programa.id}
              titulo={programa.titulo}
              descripcion={programa.descripcion}
              imagen={programa.imagen}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Inicio;
