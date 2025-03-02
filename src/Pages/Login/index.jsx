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
import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import MensajeSweet from "../../components/MensajeSweet";
import { useNavigate } from "react-router-dom"; // Para redirigir después del login

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
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Al cargar la página, revisar si hay un usuario guardado
  useEffect(() => {
    const nombreUsuario = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (nombreUsuario) {
      setUsuario(nombreUsuario);
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { usuario, password };

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      // Guardar datos
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("token", result.token);

      MensajeSweet({
        tit: "Inicio de sesión exitoso.",
        tie: 4,
      });

      setIsLoggedIn(true);
      navigate("/"); // Redirigir al usuario a otra página después de loguearse
    } catch (error) {
      MensajeSweet({
        ico: "2",
        tit: error.message,
        tie: 4,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    navigate("/login"); // Redirigir a la página de login
  };

  return (
    <>
      <Contenido>
        <Logeo>
          {isLoggedIn ? (
            <>
              <Titulo>Bienvenido {usuario}</Titulo>
              <Boton onClick={handleLogout}>Cerrar sesión</Boton>
            </>
          ) : (
            <>
              <ContenerGrupos>
                <Titulo>Iniciar Sesión</Titulo>
                <Subtitulo>¿Estás listo para comenzar?</Subtitulo>
              </ContenerGrupos>
              <form className={styles.logeo} onSubmit={handleLogin}>
                <FormControl
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
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
            </>
          )}
        </Logeo>
        <ImagenPortada>
          <img src="/img/Portada.png" alt="Portada" />
        </ImagenPortada>
      </Contenido>
    </>
  );
}

export default Login;
