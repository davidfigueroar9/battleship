export const BOARD_SIZE = 10;

export function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

export function getIndexBoatbyPosition(boats, position) {
  return boats.findIndex(
    (boat) =>
      boat.findIndex(({ x, y }) => position.x === x && position.y === y) !== -1
  );
}

export function isValidBoatPosition(boat, boats, max) {
  const isOutsideBoard = boat.findIndex((b) => b.x >= max || b.y >= max) !== -1;

  if (isOutsideBoard) {
    return false;
  }

  // this calculate is more expensive that the above
  const isBoatValid =
    boat.findIndex(
      (position) => getIndexBoatbyPosition(boats, position) !== -1
    ) !== -1;

  if (isBoatValid) {
    return false;
  }

  return true;
}

export function getRandomPossition(maxLength) {
  const x = randomInt(0, maxLength);
  const y = randomInt(0, maxLength);
  return { x, y };
}

export function getRandomBoolean() {
  const direction = randomInt(0, 2);
  return direction === 0;
}

export function setBoatPosition(length, boats, boardSize) {
  let isValid;
  let boatPosition;
  do {
    boatPosition = [];

    const { x, y } = getRandomPossition(boardSize);
    const isVertical = getRandomBoolean();

    for (let i = 0; i < length; i++) {
      boatPosition.push({
        x: !isVertical ? x + i : x,
        y: isVertical ? y + i : y,
      });
    }

    isValid = isValidBoatPosition(boatPosition, boats, boardSize);
  } while (!isValid);

  return boatPosition;
}

export function setBoatsOnBoard(boatsSizes, boardSize) {
  let initialboats = [];
  boatsSizes.forEach((element) => {
    initialboats = [
      ...initialboats,
      setBoatPosition(element, initialboats, boardSize),
    ];
  });
  return initialboats;
}

export function existOnBoats(position, boats) {
  return getIndexBoatbyPosition(boats, position) !== -1;
}
