import * as _ from 'lodash';

import { Cell, State, Vector } from './types';

export function cloneState(initialState: State) {
  return _.cloneDeep(initialState);
}

export function getDistance(vec1: Vector, vec2: Vector) {
  return Math.max(Math.abs(vec1.x - vec2.x), Math.abs(vec1.y - vec2.y));
}

export function getCellDistance(cell1: Cell, cell2: Cell) {
  return getDistance(cell1.position, cell2.position);
}

export function isValidPosition(position: Vector, dimensions: Vector) {
  return !(
    position.x < 0 ||
    position.y < 0 ||
    position.x >= dimensions.x ||
    position.y >= dimensions.y
  );
}

