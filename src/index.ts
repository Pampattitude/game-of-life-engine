import {
  computeCellNeighbors,
  computeNextState,
  drawState,
} from "./game-of-life";

function wait(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(null), time));
}

(async () => {
  const initialState = computeCellNeighbors({
    dimensions: { x: 32, y: 32 },
    cells: [
      {
        position: { x: 2, y: 1 },
        neighbors: [],
        distantNeighbors: [],
      },
      {
        position: { x: 3, y: 2 },
        neighbors: [],
        distantNeighbors: [],
      },
      {
        position: { x: 1, y: 3 },
        neighbors: [],
        distantNeighbors: [],
      },
      {
        position: { x: 2, y: 3 },
        neighbors: [],
        distantNeighbors: [],
      },
      {
        position: { x: 3, y: 3 },
        neighbors: [],
        distantNeighbors: [],
      },
    ],
  });
  console.log();
  console.log(drawState(initialState));

  let newState = initialState;
  const frames = 120;
  const frameRate = 6;
  for (let i = 0; frames > i; ++i) {
    await wait(1000 / frameRate);
    
    newState = computeNextState(newState);
    console.log();
    console.log(drawState(newState));
  }

  console.log();
})().catch((err) => console.error(err));
