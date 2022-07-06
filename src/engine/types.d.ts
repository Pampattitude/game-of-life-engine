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
