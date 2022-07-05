import * as _ from 'lodash';

export interface Rules {
  solitude: number;
  overpopulation: number;
  emptySpace: number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface State {
  dimensions: Vector;
  cells: Cell[];
}

export interface Cell {
  position: Vector;
  neighbors: Cell[];
  distantNeighbors: Cell[];
}

export const defaultRules = {
  solitude: 1,
  overpopulation: 4,
  emptySpace: 3,
};

export function cloneState(initialState: State) {
  return _.cloneDeep(initialState);
}

export function getDistance(vec1: Vector, vec2: Vector) {
  return Math.max(
    Math.abs(vec1.x - vec2.x),
    Math.abs(vec1.y - vec2.y)
  );
}

export function getCellDistance(cell1: Cell, cell2: Cell) {
  return getDistance(cell1.position, cell2.position);
}

export function isValidPosition(position: Vector, dimensions: Vector) {
  return !(position.x < 0 || position.y < 0 || position.x >= dimensions.x || position.y >= dimensions.y);
}

export function computeNextState(
  initialState: State,
  rules: Rules = defaultRules
) {
  function chain(...fcts: ((arg?: unknown) => unknown)[]) {
    let result;
    for (const fct of fcts) {
      result = fct(result);
    }
    return result;
  }

  const result = chain(
    // Initial state
    () =>
      initialState,

    // Kill off cells that are under the solitude threshold or above overpopulation threshold
    (state) => killCells(state as State, rules),

    // Compute cell neighbors and distant neighbors
    (state) => computeCellNeighbors(state as State, rules),

    // Compute cell neighbors and distant neighbors
    (state) => ({...(state as State), cells: [...(state as State).cells, ...populateEmptyCells(initialState as State, rules)]}),

    // Compute cell neighbors and distant neighbors, including newly created cells
    (state) => computeCellNeighbors(state as State, rules),
  );

  return result as State;
}

export function killCells(initialState: State, rules: Rules = defaultRules) {
  const result: State = ({
    ...initialState,
    cells: [],
  });

  for (const cell of initialState.cells) {
    if (
      cell.neighbors.length <= rules.solitude ||
      cell.neighbors.length >= rules.overpopulation
    ) {
      continue;
    }

    result.cells.push({ ...cell, neighbors: [], distantNeighbors: [] });
  }

  return result;
}

export function computeCellNeighbors(
  initialState: State,
  rules: Rules = defaultRules
) {
  const state: State = cloneState(initialState);

  for (const cell of state.cells) {
    cell.neighbors = [];
    cell.distantNeighbors = [];

    for (const cell2 of state.cells) {
      const cellDistance = getCellDistance(cell, cell2);
      if (cellDistance === 2) {
        cell.distantNeighbors.push(cell2);
      } else if (cellDistance === 1) {
        cell.neighbors.push(cell2);
      }
    }
  }

  return state;
}

export function populateEmptyCells(initialState: State, rules: Rules = defaultRules) {
  const directions: Vector[] = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];
  const cells = [];

  for (const cell of initialState.cells) {
    for (const direction of directions) {
      const candidatePosition = {x: cell.position.x + direction.x, y: cell.position.y + direction.y};
      if (!isValidPosition(candidatePosition, initialState.dimensions)) { // Off of the map
        continue ;
      }

      let invalid = false;
      let count = 1; // Start at 1 because current `cell` is obviously a neighbor
      for (const neighbor of [...cell.neighbors, ...cell.distantNeighbors]) {
        const distance = getDistance(candidatePosition, neighbor.position);

          if (distance === 0) { // Already an active cell, cannot be populated
            invalid = true
          break ;
        }
        if (distance === 1) {
          ++count;
        }
      }

      if (invalid) {
        continue;
      }

      if (count === rules.emptySpace) {
        // Do not add a cell twice
        let isUnique = true;
        for (const newCell of cells) {
          if (newCell.position.x === candidatePosition.x && newCell.position.y === candidatePosition.y) {
            isUnique = false;
          }
        }

        if (isUnique) {
        cells.push({position: candidatePosition, neighbors: [], distantNeighbors: []});
        }
      }
    }
  }

  return cells;
}

export function formatState(initialState: State) {
  const state = {
    ...initialState,
    cells: initialState.cells.map((cell) => ({
      ...cell,
      neighbors: cell.neighbors.length,
      distantNeighbors: cell.distantNeighbors.length,
    })),
  };

  return JSON.stringify(state, null, 2);
}

export function drawState(
  initialState: State,
  charset = { full: "■", empty: "·" }
) {
  let result: string[] = [];

  {
    for (let j = 0; initialState.dimensions.y > j; ++j) {
      result.push("");
      for (let i = 0; initialState.dimensions.x > i; ++i) {
        result[result.length - 1] += charset.empty;
      }
    }
  }

  for (const cell of initialState.cells) {
    const row = result[cell.position.y];
    result[cell.position.y] =
      row.substring(0, cell.position.x) +
      charset.full +
      row.substring(cell.position.x + 1);
  }

  return result.join("\n");
}
