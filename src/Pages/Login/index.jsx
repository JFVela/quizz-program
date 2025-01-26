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
            <Input icon={AccountCircle} label="Usuario" />
            <InputPassword />
            <Boton>Iniciar sesión ahora!</Boton>
          </FormControl>
          <Subtitulo>¿No tienes una cuenta?</Subtitulo>
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
