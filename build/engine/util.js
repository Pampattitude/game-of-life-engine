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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPosition = exports.getCellDistance = exports.getDistance = exports.cloneState = void 0;
const _ = __importStar(require("lodash"));
function cloneState(initialState) {
    return _.cloneDeep(initialState);
}
exports.cloneState = cloneState;
function getDistance(vec1, vec2) {
    return Math.max(Math.abs(vec1.x - vec2.x), Math.abs(vec1.y - vec2.y));
}
exports.getDistance = getDistance;
function getCellDistance(cell1, cell2) {
    return getDistance(cell1.position, cell2.position);
}
exports.getCellDistance = getCellDistance;
function isValidPosition(position, dimensions) {
    return !(position.x < 0 ||
        position.y < 0 ||
        position.x >= dimensions.x ||
        position.y >= dimensions.y);
}
exports.isValidPosition = isValidPosition;
