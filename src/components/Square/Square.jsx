import React, { useContext } from "react";
import PropTypes from "prop-types";
import { GridContext } from "../GridContext";
import styles from "./Square.module.css";

const Square = ({ position }) => {
  const { onFire, getDataByPosition } = useContext(GridContext);
  const { hit, miss } = getDataByPosition(position);

  const className = `${styles.content} ${hit ? styles.hit : ""} ${
    miss ? styles.miss : ""
  }`;
  const handleClick = () => {
    if (!hit && !miss) {
      onFire(position);
    }
  };
  return <div className={className} onClick={handleClick}></div>;
};

Square.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default Square;
