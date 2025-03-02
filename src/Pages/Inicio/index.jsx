import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Boton from "../../components/Boton";
import Contenedor from "../../components/Contenedor";
import Subtitulo from "../../components/Subtitulo";
import Carta from "../../components/Carta";
import Enlaces from "../../components/Enlaces";
import styles from "./Inicio.module.css";

const Contenido = styled.div`
  display: flex;
`;

const Logeo = styled.div`
  width: 400px;
  min-height: 90vh;
  margin: 0 auto;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const ImagenPortada = styled.div`
  overflow: hidden;

  img {
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const ContenerGrupos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  text-align: center;
`;

function Inicio() {
  const [programas, setProgramas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchProgramas = async () => {
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
        console.error("Error al cargar los programas:", error);
      }
    };

    fetchProgramas();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:8081/usuarios");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        console.error("Error al cargar los usuarios:", err);
      }
    };

    fetchUsuarios();
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

      <Container sx={{ padding: "20px 10px", marginBottom: "50px" }}>
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
