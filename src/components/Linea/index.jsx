import styles from "./Linea.module.css";

function Linea({ children }) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.linea}></div>
      <span className={styles.texto}>{children}</span>
      <div className={styles.linea}></div>
    </div>
  );
}

export default Linea;
