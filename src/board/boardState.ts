import BoardCalculator from "./boardCalculator";
import BoardGenerator from "./boardGenerator";
import { BOARD_SIZE } from "@src/types/constants";
import { LEVELS, NUM_BOARDS_PER_LEVEL } from "@src/types/levels";
import { Tile, TileSum } from "@src/types/tiles";

class BoardState {
    boardGenerator: BoardGenerator;
    boardCalculator: BoardCalculator;
    level: number;
    gameOver: boolean;
    memoMode: boolean;
    totalCoins: number;
    coinsThisLevel: number;
    grid: Tile[][];
    selectedTile: Tile;
    selectedRow: number;
    selectedCol: number;
    rowSums: TileSum[];
    colSums: TileSum[];
    num2s3s: number;

    public constructor(
        boardGenerator: BoardGenerator,
        boardCalculator: BoardCalculator
    ) {
        this.boardGenerator = boardGenerator;
        this.boardCalculator = boardCalculator;

        this.level = 1;
        this.gameOver = false;
        this.memoMode = false;
        this.totalCoins = 0;
        this.coinsThisLevel = 0;

        const levelData =
            LEVELS[this.level.toString()][
                Math.floor(Math.random() * NUM_BOARDS_PER_LEVEL)
            ];
        this.grid = this.boardGenerator.generateBoard(levelData, BOARD_SIZE);
        this.selectedTile = this.grid[0][0];
        this.selectedRow = 0;
        this.selectedCol = 0;
        [this.rowSums, this.colSums] = this.boardCalculator.calculateRowSums(
            this.grid
        );
        this.num2s3s = this.boardCalculator.calculateNum2s3s(this.grid);
    }

    public resetBoard(): void {
        this.gameOver = false;
        this.coinsThisLevel = 0;

        const levelData =
            LEVELS[this.level.toString()][
                Math.floor(Math.random() * NUM_BOARDS_PER_LEVEL)
            ];
        this.grid = this.boardGenerator.generateBoard(levelData, BOARD_SIZE);
        this.selectedTile = this.grid[0][0];
        this.selectedRow = 0;
        this.selectedCol = 0;
        [this.rowSums, this.colSums] = this.boardCalculator.calculateRowSums(
            this.grid
        );
        this.num2s3s = this.boardCalculator.calculateNum2s3s(this.grid);
    }

    public toggleMemoMode(): void {
        this.memoMode = !this.memoMode;
    }
}

export default BoardState;
