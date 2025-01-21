import BoardCalculator from "./board/boardCalculator";
import BoardContainer from "./board/boardContainer";
import BoardGenerator from "./board/boardGenerator";
import BoardListener from "./board/boardListener";

const generator = new BoardGenerator();
const calculator = new BoardCalculator();
const listener = new BoardListener();
const game = new BoardContainer(generator, calculator, listener);
game.renderGame();
