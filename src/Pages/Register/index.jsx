import React, { useState } from "react";
import { FormControl } from "@mui/material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Titulo from "../../components/Titulo";
import Subtitulo from "../../components/Subtitulo";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import Boton from "../../components/Boton";
import Linea from "../../components/Linea";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import ButtonSocial from "../../components/ButtonSocial";
import Enlaces from "../../components/Enlaces";
import SelectPais from "../../components/SelectPais";
import Styles from "./Register.module.css";
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

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pais, setPais] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Generamos un token (UUID) y lo incluimos en los datos a enviar
    const token = uuidv4();
    const data = { email, username, password, pais, token };

    console.log("Datos enviados:", data);

    try {
      const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      MensajeSweet({
        tit: "Registro exitoso. Revisa tu correo.",
        tie: 4,
      });

      // Opcional: redirigir al login
      // navigate("/login");
    } catch (error) {
      MensajeSweet({
        ico: "2",
        tit: error.message,
        tie: 4,
      });
    }
  };

  return (
    <>
      <Contenido>
        <Logeo>
          <ContenerGrupos>
            <Titulo>Crear Cuenta</Titulo>
            <Subtitulo>
              Únete a la diversión y demuestra tus conocimientos
            </Subtitulo>
          </ContenerGrupos>
          <form onSubmit={handleRegister} className={Styles.formulario}>
            <FormControl
              style={{ display: "flex", gap: "20px", alignItems: "center" }}
              fullWidth
            >
              {/* Ya no es necesario el input hidden ya que generamos el token en el handleRegister */}
              <Input
                icon={EmailIcon}
                label="Correo electrónico"
                placeholder="Ingrese su correo electronico" 
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={PersonIcon}
                label="Crear usuario"
                placeholder="Ingrese un usuario entre 8 y 15 carácteres"
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputPassword
                label="Crear una contraseña"
                placeholder="Entre 10 y 20 carácteres"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Asegúrate de que el componente SelectPais invoque onChange con el país seleccionado */}
              <SelectPais
                icon={PublicIcon}
                onChange={(selected) => setPais(selected)}
              />
              <Boton>Crear ahora!</Boton>
            </FormControl>
          </form>
          {message && <p>{message}</p>}
          <Subtitulo>
            ¿Ya tienes una cuenta?{" "}
            <Enlaces url={"../login"} color="black">
              <span style={{ textDecorationLine: "underline" }}>
                Inicia sesión aquí
              </span>
            </Enlaces>
          </Subtitulo>
          <Linea>
            <strong>Crear cuenta</strong> con ...
          </Linea>
          <ContenerGrupos>
            <ButtonSocial
              imgSrc="/img/google.png"
              text="Entrar con Google"
              alt="Google"
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

export default Register;
