import {
  Box,
  FormControl,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Titulo from "../../components/Titulo";
import Subtitulo from "../../components/Subtitulo";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Https from "@mui/icons-material/Https";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Boton from "../../components/Boton";
import Linea from "../../components/Linea";

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

// Componente reutilizable para campos de entrada
const InputGroup = ({ icon: Icon, label, type = "text", ...props }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-end",
      width: "90%",
      backgroundColor: "#F0EDFF",
      borderRadius: "15px",
      padding: "14px 18px",
    }}
  >
    <Icon sx={{ color: "black", mr: 1, my: 0.5 }} />
    <TextField
      id={label.toLowerCase()}
      label={label}
      variant="standard"
      type={type}
      fullWidth
      {...props}
    />
  </Box>
);

// Componente para el campo de contraseña con funcionalidad de mostrar/ocultar
const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <InputGroup
      icon={Https}
      label="Password"
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

// Componente para botones de redes sociales
const SocialLoginButton = ({ imgSrc, text, alt }) => (
  <Button
    sx={{ padding: "10px", gap: "10px", borderRadius: "20px" }}
    variant="outlined"
    color="info"
  >
    <img src={imgSrc} alt={alt} /> {text}
  </Button>
);

function Login() {
  const codigo = uuidv4();

  return (
    <>
      <Contenido>
        <Logeo>
          <ContenerGrupos>
            <Titulo>Iniciar Sesión</Titulo>
            <Subtitulo>¿Estas Listo para comenzar?</Subtitulo>
          </ContenerGrupos>
          <FormControl
            style={{ display: "flex", gap: "20px", alignItems: "center" }}
            fullWidth
          >
            <input type="hidden" value={codigo} />
            <InputGroup icon={AccountCircle} label="Username" />
            <PasswordInput />
            <Boton>Iniciar sesión ahora!</Boton>
          </FormControl>
          <Subtitulo>¿No tienes una cuenta?</Subtitulo>
          <Linea>
            <strong>Iniciar sesión</strong> con otros
          </Linea>
          <ContenerGrupos>
            <SocialLoginButton
              imgSrc="/img/google.png"
              text="Entrar con Google"
              alt="Google"
            />
            <SocialLoginButton
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
