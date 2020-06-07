import React from "react";
import styles from "./MisileCount.module.css";

const MisileCount = ({ number }) => (
  <div className={styles.container}>
    Misile Count
    <div className={styles.number}>{number}</div>
  </div>
);

export default MisileCount;
