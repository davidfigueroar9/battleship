import React from "react";
import PropTypes from "prop-types";

export const GridContext = React.createContext();

const GridContextPrivider = ({ getDataByPosition, onFire, children }) => {
  return (
    <GridContext.Provider value={{ getDataByPosition, onFire }}>
      {children}
    </GridContext.Provider>
  );
};

GridContextPrivider.propTypes = {
  getDataByPosition: PropTypes.func.isRequired,
  onFire: PropTypes.func.isRequired,
  children: PropTypes.node,
};

GridContextPrivider.defaultProps = {
  children: null,
};

export default GridContextPrivider;
