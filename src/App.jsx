import React from "react";
import Grid from "./components/Grid";
import GridContext from "./components/GridContext";
import LayoutGame from "./components/LayoutGame";
import Message from "./components/Message";
import MisileCount from "./components/MisileCount";
import DisplayBoats from "./components/DisplayBoats";
import DisplayStatus from "./components/DisplayStatus";
import { BOARD_SIZE } from "./utils";
import useBattleship from "./useBattleship";
import styles from "./App.module.css";

export function App() {
  const {
    misileLeft,
    win,
    restartGame,
    gameOver,
    message,
    boats,
    getDataByPosition,
    handleOnFire,
  } = useBattleship();

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <div className={styles.logo}>BATTLESHIP</div>
      </div>

      <LayoutGame
        panel={
          <>
            <MisileCount number={misileLeft} />
            {gameOver ? (
              <DisplayStatus
                win={win}
                restartGame={restartGame}
                gameOver={gameOver}
              />
            ) : (
              <Message text={message} />
            )}

            <DisplayBoats boats={boats} />
          </>
        }
      >
        <GridContext
          getDataByPosition={getDataByPosition}
          onFire={handleOnFire}
        >
          <Grid rows={BOARD_SIZE} columms={BOARD_SIZE} />
        </GridContext>
      </LayoutGame>
    </div>
  );
}

export default App;
