import React, { memo } from "react";
import Square from "../Square";
import styles from "./Grid.module.css";

const Grid = ({ rows, columms }) => {
  const colummsToShow = new Array(columms);
  colummsToShow.fill(null);
  const rowsToShow = new Array(rows);
  rowsToShow.fill(colummsToShow);
  return (
    <div className={styles.Grid}>
      {rowsToShow.map((columms, y) => {
        return (
          <div className={styles.Row} key={`Row-${y}`}>
            {columms.map((_, x) => (
              <div className={styles["Row-item"]} key={`Square-${x}-${y}`}>
                <Square position={{ x, y }} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Grid);
