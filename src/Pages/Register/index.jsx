import { FormControl } from "@mui/material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Titulo from "../../components/Titulo";
import Subtitulo from "../../components/Subtitulo";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Boton from "../../components/Boton";
import Linea from "../../components/Linea";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import ButtonSocial from "../../components/ButtonSocial";
import Enlaces from "../../components/Enlaces";

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
  const codigo = uuidv4();

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
          <FormControl
            style={{ display: "flex", gap: "20px", alignItems: "center" }}
            fullWidth
          >
            <input type="hidden" value={codigo} />
            <Input icon={EmailIcon} label="Correo electrónico" />
            <Input icon={PersonIcon} label="Crear usuario" />
            <InputPassword label="Crear una contraseña" />
            <Boton>Crear ahora!</Boton>
          </FormControl>
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

export default Login;
