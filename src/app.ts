import BoardCalculator from "./board/boardCalculator";
import BoardContainer from "./board/boardContainer";
import BoardGenerator from "./board/boardGenerator";

const generator = new BoardGenerator();
const calculator = new BoardCalculator();
const game = new BoardContainer(generator, calculator);
game.renderGame();
