"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawState = exports.formatState = void 0;
function formatState(initialState) {
    const state = Object.assign(Object.assign({}, initialState), { cells: initialState.cells.map((cell) => (Object.assign(Object.assign({}, cell), { neighbors: cell.neighbors.length, distantNeighbors: cell.distantNeighbors.length }))) });
    return JSON.stringify(state, null, 2);
}
exports.formatState = formatState;
function drawState(initialState, charset = { full: "■", empty: "·" }) {
    let result = [];
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
exports.drawState = drawState;
