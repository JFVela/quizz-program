import React from "react";
import styles from "./Cabecera.module.css";
import Enlaces from "../Enlaces";

const Cabecera = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Enlaces url={"./"}>CodeQuiz</Enlaces>
      </h1>
      <div className={styles.menu}>
        <p className={styles.hogar}>
          <Enlaces url={"./"}>Home</Enlaces>
        </p>
        <p className={styles.hogar}>
          <Enlaces url={"./login"}>Login</Enlaces>
        </p>
      </div>
    </header>
  );
};

export default Cabecera;
