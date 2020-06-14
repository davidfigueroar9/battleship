import React from "react";
import PropTypes from "prop-types";
import styles from "./LayoutGame.module.css";

const LayoutGame = ({ panel, children }) => (
  <div className={styles.container}>
    <div>{children}</div>
    <div className={styles.panel}>{panel}</div>
  </div>
);

LayoutGame.propTypes = {
  panel: PropTypes.node,
  children: PropTypes.node,
};

LayoutGame.defaultProps = {
  panel: null,
  children: null,
};

export default LayoutGame;
