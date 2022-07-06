"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateEmptyCells = exports.computeCellNeighbors = exports.killCells = exports.computeNextState = void 0;
const config_1 = require("./engine/config");
const util_1 = require("./engine/util");
__exportStar(require("./engine/"), exports);
function computeNextState(initialState, rules = config_1.defaultRules) {
    function chain(...fcts) {
        let result;
        for (const fct of fcts) {
            result = fct(result);
        }
        return result;
    }
    const result = chain(
    // Initial state
    () => initialState, 
    // Kill off cells that are under the solitude threshold or above overpopulation threshold
    (state) => killCells(state, rules), 
    // Compute cell neighbors and distant neighbors
    (state) => computeCellNeighbors(state, rules), 
    // Compute cell neighbors and distant neighbors
    (state) => (Object.assign(Object.assign({}, state), { cells: [
            ...state.cells,
            ...populateEmptyCells(initialState, rules),
        ] })), 
    // Compute cell neighbors and distant neighbors, including newly created cells
    (state) => computeCellNeighbors(state, rules));
    return result;
}
exports.computeNextState = computeNextState;
function killCells(initialState, rules = config_1.defaultRules) {
    const result = Object.assign(Object.assign({}, initialState), { cells: [] });
    for (const cell of initialState.cells) {
        if (cell.neighbors.length <= rules.solitude ||
            cell.neighbors.length >= rules.overpopulation) {
            continue;
        }
        result.cells.push(Object.assign(Object.assign({}, cell), { neighbors: [], distantNeighbors: [] }));
    }
    return result;
}
exports.killCells = killCells;
function computeCellNeighbors(initialState, rules = config_1.defaultRules) {
    const state = (0, util_1.cloneState)(initialState);
    for (const cell of state.cells) {
        cell.neighbors = [];
        cell.distantNeighbors = [];
        for (const cell2 of state.cells) {
            const cellDistance = (0, util_1.getCellDistance)(cell, cell2);
            if (cellDistance === 2) {
                cell.distantNeighbors.push(cell2);
            }
            else if (cellDistance === 1) {
                cell.neighbors.push(cell2);
            }
        }
    }
    return state;
}
exports.computeCellNeighbors = computeCellNeighbors;
function populateEmptyCells(initialState, rules = config_1.defaultRules) {
    const directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ];
    const cells = [];
    for (const cell of initialState.cells) {
        for (const direction of directions) {
            const candidatePosition = {
                x: cell.position.x + direction.x,
                y: cell.position.y + direction.y,
            };
            if (!(0, util_1.isValidPosition)(candidatePosition, initialState.dimensions)) {
                // Off of the map
                continue;
            }
            let invalid = false;
            let count = 1; // Start at 1 because current `cell` is obviously a neighbor
            for (const neighbor of [...cell.neighbors, ...cell.distantNeighbors]) {
                const distance = (0, util_1.getDistance)(candidatePosition, neighbor.position);
                if (distance === 0) {
                    // Already an active cell, cannot be populated
                    invalid = true;
                    break;
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
                    if (newCell.position.x === candidatePosition.x &&
                        newCell.position.y === candidatePosition.y) {
                        isUnique = false;
                    }
                }
                if (isUnique) {
                    cells.push({
                        position: candidatePosition,
                        neighbors: [],
                        distantNeighbors: [],
                    });
                }
            }
        }
    }
    return cells;
}
exports.populateEmptyCells = populateEmptyCells;
