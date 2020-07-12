import { useState } from "react";
import { BOARD_SIZE, setBoatsOnBoard, getIndexBoatbyPosition } from "./utils";

const maxAttempsDefault = 80;
const boatsSizesDefault = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

let timer = null;

function useBattleship(config = {}) {
  const {
    boatsSizes = boatsSizesDefault,
    maxAttemps = maxAttempsDefault,
  } = config;
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

    if (maxAttempsDefault <= attempts.length + 1) {
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

  const misileLeft = maxAttemps - attempts.length;

  return {
    misileLeft,
    win,
    message,
    boats,
    gameOver,
    restartGame,
    getDataByPosition,
    handleOnFire,
  };
}

export default useBattleship;
