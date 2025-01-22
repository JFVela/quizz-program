import { Link } from "react-router-dom";
import styles from "./Enlaces.module.css";

function Links({ url, children }) {
  return (
    <Link className={styles.enlace} to={url}>
      {children}
    </Link>
  );
}

export default Links;
