import React from "react";

export const GridContext = React.createContext();

const GridContextPrivider = ({ getDataByPosition, onFire, children }) => {
  return (
    <GridContext.Provider value={{ getDataByPosition, onFire }}>
      {children}
    </GridContext.Provider>
  );
};

export default GridContextPrivider;
