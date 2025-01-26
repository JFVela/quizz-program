import { Link } from "react-router-dom";
import styles from "./Enlaces.module.css";

function Links({ url, children, color = "white" }) {
  return (
    <Link style={{ color }} className={styles.enlace} to={url}>
      {children}
    </Link>
  );
}

export default Links;
