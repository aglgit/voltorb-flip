import BoardCalculator from "./boardCalculator";
import BoardGenerator from "./boardGenerator";
import { BOARD_SIZE } from "@src/types/constants";
import { LEVELS, NUM_BOARDS_PER_LEVEL } from "@src/types/levels";
import { Tile, TileSum } from "@src/types/tiles";
import { Direction } from "../types/direction";

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

    public toggleSelectedTile(tile: Tile, i: number, j: number): void {
        this.selectedTile = tile;
        this.selectedRow = i;
        this.selectedCol = j;
    }

    public moveSelectedTile(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                if (this.selectedRow > 0) {
                    this.selectedRow--;
                    this.selectedTile =
                        this.grid[this.selectedRow][this.selectedCol];
                }
                break;
            case Direction.Down:
                if (this.selectedRow < BOARD_SIZE - 1) {
                    this.selectedRow++;
                    this.selectedTile =
                        this.grid[this.selectedRow][this.selectedCol];
                }
                break;
            case Direction.Left:
                if (this.selectedCol > 0) {
                    this.selectedCol--;
                    this.selectedTile =
                        this.grid[this.selectedRow][this.selectedCol];
                }
                break;
            case Direction.Right:
                if (this.selectedCol < BOARD_SIZE - 1) {
                    this.selectedCol++;
                    this.selectedTile =
                        this.grid[this.selectedRow][this.selectedCol];
                }
                break;
        }
    }

    public toggleMark(mark: number): void {
        const tile = this.selectedTile;
        if (tile) {
            if (tile.marks.has(mark)) {
                tile.marks.delete(mark);
            } else {
                tile.marks.add(mark);
            }
        }
    }

    public isGamecomplete(): boolean {
        return this.num2s3s === 0;
    }

    public revealTile(tile: Tile): void {
        tile.revealed = true;
        if (tile.voltorb) {
            this.advanceGameOver();
        } else {
            if (tile.value > 1) {
                this.num2s3s--;
            }
            this.coinsThisLevel =
                this.coinsThisLevel > 0
                    ? this.coinsThisLevel * tile.value
                    : tile.value;
        }
        if (this.isGamecomplete()) {
            this.advanceGameComplete();
        }
    }

    public flipBoard(): void {
        const grid = this.grid;
        grid.forEach((row) => {
            row.forEach((col) => {
                col.revealed = true;
            });
        });
    }

    private advanceGameOver(): void {
        // TODO: remove this rendering logic from state
        alert("Game over!");
        this.gameOver = true;
        this.flipBoard();
        this.level = this.level > 1 ? this.level - 1 : 1;
    }

    private advanceGameComplete(): void {
        alert("You won!");
        this.gameOver = true;
        this.flipBoard();
        this.totalCoins += this.coinsThisLevel;
        this.level++;
    }
}

export default BoardState;
