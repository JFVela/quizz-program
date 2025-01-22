import React from 'react';
import Styles from "./Subtitulo.module.css"

const Subtitulo = ({ children }) => {
    return (
        <h2 className={Styles.sub}>{children}</h2>
    );
};

export default Subtitulo;