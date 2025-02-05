import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "./Clasificacion.module.css";
import Titulo from "../../components/Titulo";

const CiruloNumero = styled.div`
  background-color: #fff2af;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid var(--color1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pais = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid var(--color2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Contenedor = styled.div`
  background-color: #dad2ff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
`;

const Reglon = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  border: 5px solid var(--color1);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 20px;
  @media (max-width: 1000px) {
    justify-content: flex-start;
    gap: 20px;
  }
`;

const Puntos = styled.h3`
  color: #555555;
  margin: 0;
`;

const TiempoSegundos = styled.h3`
  color: var(--color1);
  margin: 0;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Usuario = styled.h2`
  margin: 0;
`;

const Clasificacion = () => {
  const [paises, setPaises] = useState([]);
  const [banderas, setBanderas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Fetch de la API de países (para las banderas)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const banderaPais = data.map((pais) => pais.flags.png);
        const nombrePais = data.map((pais) => pais.name.common);
        setPaises(nombrePais);
        setBanderas(banderaPais);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch de los usuarios desde el JSON en la nube
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/JFVela/api-quizz-usuarios/db"
        );
        const data = await response.json();
        // data es un objeto con la propiedad "Usuarios"
        if (Array.isArray(data.Usuarios)) {
          setUsuarios(data.Usuarios);
        }
        // Retrasa la carga 3 segundos para asegurar que todo esté listo
        setTimeout(() => setCargando(false), 3000);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <Contenedor>
      <Titulo>Tabla de Clasificación</Titulo>
      {/* Mi puntuación personal */}
      <Reglon>
        <div className={styles.destacado}>
          <CiruloNumero>
            <b>15</b>
          </CiruloNumero>
          <Pais>
            <img
              src="" // Aquí va la imagen de tu país
              alt="mi pais"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Pais>
        </div>
        <div className={styles.info}>
          <Usuario>Juanito</Usuario>
          <Puntos>1700 puntos</Puntos>
          <TiempoSegundos>500 segundos</TiempoSegundos>
        </div>
      </Reglon>
      {cargando ? (
        <h3>Cargando clasificación...</h3>
      ) : (
        usuarios.map((usuario, index) => (
          <Reglon key={usuario.id}>
            <div className={styles.destacado}>
              <CiruloNumero>
                <b>{index + 1}</b>
              </CiruloNumero>
              <Pais>
                <img
                  src={
                    paises.includes(usuario.pais)
                      ? banderas[paises.indexOf(usuario.pais)]
                      : "https://restcountries.com/data/afg.svg"
                  }
                  alt={usuario.pais}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Pais>
            </div>
            <div className={styles.info}>
              <Usuario>{usuario.nombreUsuario}</Usuario>
              <Puntos>{usuario.maxPuntaje} puntos</Puntos>
              <TiempoSegundos>{usuario.Tiempo} segundos</TiempoSegundos>
            </div>
          </Reglon>
        ))
      )}
    </Contenedor>
  );
};

export default Clasificacion;
