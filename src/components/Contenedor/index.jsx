import React from "react";
import styles from "./Contenedor.module.css";
import { Container } from "@mui/material";

const Contenedor = ({ children }) => {
  return (
      <Container
        className={styles.contenedor}
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
        maxWidth="sm"
      >
        {children}
      </Container>
  );
};

export default Contenedor;
