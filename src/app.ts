import BoardCalculator from "./board/boardCalculator";
import BoardGame from "./board/boardGame";
import BoardGenerator from "./board/boardGenerator";

const generator = new BoardGenerator();
const calculator = new BoardCalculator();
const game = new BoardGame(generator, calculator);
game.renderGame();
