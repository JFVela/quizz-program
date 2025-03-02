import React, { useContext } from "react";
import styles from "./Cabecera.module.css";
import Enlaces from "../Enlaces";
import Boton from "../Boton";
import { AuthContext } from "../../hooks/useAuthStorage";

const Cabecera = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Enlaces url={"./"}>CodeQuiz</Enlaces>
      </h1>
      <div className={styles.menu}>
        {isLoggedIn ? (
          <>
            <p className={styles.user}>{user.usuario}</p>
            <Boton onClick={logout}>Logout</Boton>
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
