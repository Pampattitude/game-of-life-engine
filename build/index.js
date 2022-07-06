"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_of_life_1 = require("./game-of-life");
const util_1 = require("./util");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const initialState = (0, game_of_life_1.computeCellNeighbors)({
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
    console.log((0, game_of_life_1.drawState)(initialState));
    let newState = initialState;
    const frames = 120;
    const frameRate = 6;
    for (let i = 0; frames > i; ++i) {
        yield (0, util_1.wait)(1000 / frameRate);
        newState = (0, game_of_life_1.computeNextState)(newState);
        console.log();
        console.log((0, game_of_life_1.drawState)(newState));
    }
    console.log();
}))().catch((err) => console.error(err));
