import BoardCalculator from "./board/boardCalculator";
import BoardContainer from "./board/boardContainer";
import BoardGenerator from "./board/boardGenerator";
import BoardListener from "./board/boardListener";
import BoardState from "./board/boardState";

const generator = new BoardGenerator();
const calculator = new BoardCalculator();
const state = new BoardState(generator, calculator);
const listener = new BoardListener(state);
const game = new BoardContainer(generator, calculator, listener, state);
game.startGame();
