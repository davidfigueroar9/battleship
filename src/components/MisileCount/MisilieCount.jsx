import React from "react";
import PropTypes from "prop-types";
import styles from "./MisileCount.module.css";

const MisileCount = ({ number }) => (
  <div className={styles.container}>
    Misile Count
    <div className={styles.number}>{number}</div>
  </div>
);

MisileCount.propTypes = {
  number: PropTypes.number.isRequired,
};

export default MisileCount;
