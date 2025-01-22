import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Boton from "../Boton";
import styles from "./Carta.module.css";
import Enlaces from "../Enlaces";

export default function Carta({ titulo, descripcion, imagen }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={imagen} alt={titulo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={styles.contenedorBoton}>
          <Enlaces url={`/quizz/${titulo}`}>
            <Boton>Comenzar</Boton>
          </Enlaces>
        </div>
      </CardActions>
    </Card>
  );
}
