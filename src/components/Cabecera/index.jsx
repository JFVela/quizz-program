import React from "react";
import styles from "./Cabecera.module.css";
import Enlaces from "../Enlaces";

const Cabecera = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Enlaces url={"./"}>CodeQuiz</Enlaces>
      </h1>
      <p className={styles.hogar}>
        <Enlaces url={"./"}>Home</Enlaces>
      </p>
    </header>
  );
};

export default Cabecera;
