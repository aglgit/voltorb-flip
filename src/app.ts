import BoardCalculator from "./board/boardCalculator";
import BoardGenerator from "./board/boardGenerator";
import BoardListener from "./board/boardListener";
import BoardRenderer from "./board/boardRenderer";
import BoardState from "./board/boardState";

const generator = new BoardGenerator();
const calculator = new BoardCalculator();
const state = new BoardState(generator, calculator);
const listener = new BoardListener(state);
const renderer = new BoardRenderer(listener, state);
renderer.firstRenderGame();
