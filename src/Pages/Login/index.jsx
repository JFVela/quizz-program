import { FormControl } from "@mui/material";
import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Subtitulo from "../../components/Subtitulo";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Boton from "../../components/Boton";
import Linea from "../../components/Linea";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import ButtonSocial from "../../components/ButtonSocial";
import Enlaces from "../../components/Enlaces";
import { useState } from "react";
import styles from "./Login.module.css";
import MensajeSweet from "../../components/MensajeSweet";

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

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  // Estado para controlar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Puedes usar otro estado para guardar datos del usuario si lo requieres

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { usuario, password };

    try {
      const response = await fetch("http://192.168.1.31:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Se muestra el mensaje de error (ej: "usuario no encontrado" o "contraseña incorrecta")
        throw new Error(result.error);
      }

      // Si todo es correcto, mostramos el mensaje de éxito
      MensajeSweet({
        tit: "Inicio de sesión exitoso.",
        tie: 4,
      });

      // Aquí establecemos la sesión iniciada (podrías guardar datos en un contexto o localStorage)
      setIsLoggedIn(true);
    } catch (error) {
      // En caso de error se muestra el mensaje con MensajeSweet y se mantiene la sección abierta
      MensajeSweet({
        ico: "2",
        tit: error.message,
        tie: 4,
      });
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <Titulo>Bienvenido {usuario}</Titulo>
        {/* Aquí puedes renderizar el panel de control o redirigir a la ruta correspondiente */}
      </div>
    );
  }

  return (
    <>
      <Contenido>
        <Logeo>
          <ContenerGrupos>
            <Titulo>Iniciar Sesión</Titulo>
            <Subtitulo>¿Estas Listo para comenzar?</Subtitulo>
          </ContenerGrupos>
          <form className={styles.logeo} onSubmit={handleLogin}>
            <FormControl
              style={{ display: "flex", gap: "20px", alignItems: "center" }}
              fullWidth
            >
              <Input
                icon={AccountCircle}
                label="Usuario"
                placeholder="Ingresa tu usuario"
                onChange={(e) => setUsuario(e.target.value)}
              />
              <InputPassword
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Boton type="submit">Iniciar sesión ahora!</Boton>
            </FormControl>
          </form>

          <Subtitulo>
            ¿No tienes una cuenta?{" "}
            <Enlaces url={"../register"} color="black">
              <span style={{ textDecorationLine: "underline" }}>
                Crear cuenta
              </span>
            </Enlaces>
          </Subtitulo>

          <Linea>
            <strong>Iniciar sesión</strong> con otros
          </Linea>
          <ContenerGrupos>
            <ButtonSocial
              imgSrc="/img/google.png"
              text="Entrar con Google"
              alt="Google"
            />
            <ButtonSocial
              imgSrc="/img/face.png"
              text="Entrar con Facebook"
              alt="Facebook"
            />
          </ContenerGrupos>
        </Logeo>
        <ImagenPortada>
          <img src="/img/Portada.png" alt="Portada" />
        </ImagenPortada>
      </Contenido>
    </>
  );
}

export default Login;
