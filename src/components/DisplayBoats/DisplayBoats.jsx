import React from "react";
import styles from "./DisplayBoats.module.css";

const DisplayBoats = ({ boats }) => (
  <div className={styles.container}>
    {boats.map((boat, index) => {
      const isDestroy = boat.every((b) => b.hit);
      return (
        <div className={styles.boat}>
          {boat.map((p) => (
            <div
              className={`${styles.position} ${
                isDestroy ? styles.destroy : ""
              } `}
            ></div>
          ))}
        </div>
      );
    })}
  </div>
);

export default DisplayBoats;
