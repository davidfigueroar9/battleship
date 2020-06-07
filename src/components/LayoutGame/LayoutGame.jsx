import React from "react";
import styles from "./LayoutGame.module.css";

const LayoutGame = ({ panel, children }) => (
  <div className={styles.container}>
    <div>{children}</div>
    <div className={styles.panel}>{panel}</div>
  </div>
);

export default LayoutGame;
