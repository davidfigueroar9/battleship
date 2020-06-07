import React, { useState } from "react";
import Grid from "./components/Grid";
import GridContext from "./components/GridContext";
import LayoutGame from "./components/LayoutGame";
import Message from "./components/Message";
import MisileCount from "./components/MisileCount";
import DisplayBoats from "./components/DisplayBoats";
import { BOARD_SIZE, setBoatsOnBoard, getIndexBoatbyPosition } from "./utils";
import "./App.css";

const MAX_ATTEMTS = 100;
const boatsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

let timer = null;

function App() {
  const [attempts, setAttempt] = useState([]);
  const [message, setMessage] = useState("");
  const [boats, setBoats] = useState(setBoatsOnBoard(boatsSizes, BOARD_SIZE));
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const restartGame = () => {
    setAttempt([]);
    setMessage("");
    setGameOver(false);
    setWin(false);
    setBoats(setBoatsOnBoard(boatsSizes, BOARD_SIZE));
  };

  const getDataByPosition = (position) => {
    let hit = false;
    let miss = false;

    const found = attempts.find(
      (attempts) =>
        attempts.position.x === position.x && attempts.position.y === position.y
    );

    if (found) {
      hit = found.hit;
      miss = found.miss;
    }

    if (gameOver) {
      hit = getIndexBoatbyPosition(boats, position) !== -1;
    }

    return { hit, miss };
  };

  const handleOnFire = (position) => {
    if (gameOver) return;
    const index = getIndexBoatbyPosition(boats, position);
    const isHit = index !== -1;

    let message = isHit ? "HIT!" : "MISSED!";

    setAttempt((attempts) => [
      ...attempts,
      { position, hit: isHit, miss: !isHit },
    ]);
    if (timer) {
      clearTimeout(timer);
    }

    if (isHit) {
      const boat = boats[index].map((p) => {
        if (p.x === position.x && p.y === position.y) {
          return {
            ...p,
            hit: true,
          };
        }
        return p;
      });

      if (boat.every((b) => b.hit)) {
        message = "DESTROY!";
      }

      const newBoats = [...boats];
      newBoats[index] = boat;
      setBoats(newBoats);
    }

    setMessage(message);

    timer = setTimeout(() => {
      setMessage("");
    }, 1000);

    if (MAX_ATTEMTS <= attempts.length + 1) {
      setGameOver(true);
    }

    if (isHit) {
      const hitsNumber = attempts.reduce((a, b) => (b.hit ? a + 1 : a), 1);
      const boatsPositionNumber = boats.reduce((a, b) => a + b.length, 0);
      if (hitsNumber === boatsPositionNumber) {
        setGameOver(true);
        setWin(true);
      }
    }
  };

  const misileLeft = MAX_ATTEMTS - attempts.length;

  return (
    <div className="App">
      <div className="header">
        <div className="logo">BATTLESHIP</div>
        <div className="status">
          {gameOver && <div className="gameover">Game Over</div>}
          {gameOver && (
            <div className="gameover-message">
              {win ? "YOU WIN" : "YOU LOST"}
            </div>
          )}
          {gameOver && (
            <div onClick={restartGame} className="restart">
              Play again
            </div>
          )}
        </div>
      </div>

      <LayoutGame
        panel={
          <>
            <MisileCount number={misileLeft} />
            <Message text={message} />
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
