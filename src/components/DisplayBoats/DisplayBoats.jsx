import React from "react";
import PropTypes from "prop-types";
import styles from "./DisplayBoats.module.css";

const DisplayBoats = ({ boats }) => (
  <div className={styles.container}>
    {boats.map((boat, index) => {
      const isDestroy = boat.every((b) => b.hit);
      return (
        <div className={styles.boat} key={`boats-${index}`}>
          {boat.map((p) => (
            <div
              key={`boat-${p.x}-${p.y}`}
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

DisplayBoats.propTypes = {
  boats: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        hit: PropTypes.bool,
      })
    )
  ),
};

export default DisplayBoats;
