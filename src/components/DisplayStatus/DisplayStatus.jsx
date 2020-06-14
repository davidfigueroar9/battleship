import React from "react";
import PropTypes from "prop-types";
import styles from "./DisplayStatus.module.css";

const DisplayStatus = ({ gameOver, win, restartGame }) => (
  <div className={styles.status}>
    {gameOver && <div className={styles.gameover}>Game Over</div>}
    {gameOver && (
      <div className={styles.gameoverMessage}>
        {win ? "YOU WIN" : "YOU LOST"}
      </div>
    )}
    {gameOver && (
      <div onClick={restartGame} className={styles.restart}>
        Play again
      </div>
    )}
  </div>
);

DisplayStatus.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  win: PropTypes.bool.isRequired,
  restartGame: PropTypes.func.isRequired,
};

export default DisplayStatus;
