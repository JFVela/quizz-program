import styles from "./Error404.module.css";
import Titulo from "../../components/Titulo";
import Contenedor from "../../components/Contenedor";
import Subtitulo from "../../components/Subtitulo";
import Enlace from "../../components/Enlaces";

function Error() {
  return (
    <main className={styles.contenidoError}>
      <section className={styles.imagen}>
        <img
          src="/public/img/error404.png"
          alt="Imagen de página no encontrada"
        />
      </section>
      <Contenedor>
        <Titulo>Error 404</Titulo>
        <Subtitulo>
          Al parecer la página que intenta encontrar <b>no existe</b>. Por favor, 
          regrese a la <Enlace url={"../"} className={styles.enlace}>página principal</Enlace>.
        </Subtitulo>
      </Contenedor>
    </main>
  );
}

export default Error;
