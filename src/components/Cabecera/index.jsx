import React from "react";
import styles from "./Cabecera.module.css";
import Enlaces from "../Enlaces";
import { useAuthStorage } from "../../hooks/useAuthStorage";

const Cabecera = () => {

  const { user, logout, isLoggedIn } = useAuthStorage();


  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Enlaces url={"./"}>CodeQuiz</Enlaces>
      </h1>
      <div className={styles.menu}>
        {isLoggedIn ? (
          <>
            <p className={styles.user}>Hola {user.usuario}</p>
            <button className={styles.logout} onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <p className={styles.hogar}>
              <Enlaces url={"./"}>Home</Enlaces>
            </p>
            <p className={styles.hogar}>
              <Enlaces url={"./login"}>Login</Enlaces>
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Cabecera;
