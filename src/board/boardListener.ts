import { Tile } from "@src/types/tiles";
import { BOARD_SIZE } from "@src/types/constants";
import BoardState from "./boardState";

class BoardListener {
    boardState: BoardState;

    constructor(boardState: BoardState) {
        this.boardState = boardState;
    }

    public gameTileMarkListener(mark: number): void {
        const tile = this.boardState.selectedTile;
        this.toggleMark(tile, mark);
    }

    public gameTileRevealListener(tile: Tile, i: number, j: number): void {
        if (this.boardState.gameOver) {
            this.boardState.resetBoard();
        } else if (this.boardState.memoMode) {
            this.boardState.selectedTile = tile;
            this.boardState.selectedRow = i;
            this.boardState.selectedCol = j;
        } else {
            this.boardState.selectedTile = tile;
            this.boardState.selectedRow = i;
            this.boardState.selectedCol = j;
            this.revealTile(tile);
        }
    }

    public keyPressListener(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                if (this.boardState.selectedRow > 0) {
                    this.boardState.selectedRow--;
                    this.boardState.selectedTile =
                        this.boardState.grid[this.boardState.selectedRow][
                            this.boardState.selectedCol
                        ];
                }
                break;
            case "ArrowDown":
                event.preventDefault();
                if (this.boardState.selectedRow < BOARD_SIZE - 1) {
                    this.boardState.selectedRow++;
                    this.boardState.selectedTile =
                        this.boardState.grid[this.boardState.selectedRow][
                            this.boardState.selectedCol
                        ];
                }
                break;
            case "ArrowLeft":
                event.preventDefault();
                if (this.boardState.selectedCol > 0) {
                    this.boardState.selectedCol--;
                    this.boardState.selectedTile =
                        this.boardState.grid[this.boardState.selectedRow][
                            this.boardState.selectedCol
                        ];
                }
                break;
            case "ArrowRight":
                event.preventDefault();
                if (this.boardState.selectedCol < BOARD_SIZE - 1) {
                    this.boardState.selectedCol++;
                    this.boardState.selectedTile =
                        this.boardState.grid[this.boardState.selectedRow][
                            this.boardState.selectedCol
                        ];
                }
                break;
            case "Enter":
                this.gameTileRevealListener(
                    this.boardState.selectedTile,
                    this.boardState.selectedRow,
                    this.boardState.selectedCol
                );
                break;
            case "x":
            case "X":
                this.boardState.toggleMemoMode();
                break;
            case "0":
            case "1":
            case "2":
            case "3": {
                const tile = this.boardState.selectedTile;
                const mark = parseInt(event.key);
                this.toggleMark(tile, mark);
                break;
            }
        }
    }

    private toggleMark(tile: Tile, mark: number): void {
        if (tile) {
            if (tile.marks.has(mark)) {
                tile.marks.delete(mark);
            } else {
                tile.marks.add(mark);
            }
        }
    }

    private revealTile(tile: Tile): void {
        tile.revealed = true;
        if (tile.voltorb) {
            this.triggerGameOver();
        } else {
            if (tile.value > 1) {
                this.boardState.num2s3s--;
            }
            this.boardState.coinsThisLevel =
                this.boardState.coinsThisLevel > 0
                    ? this.boardState.coinsThisLevel * tile.value
                    : tile.value;
        }
        if (this.isGamecomplete()) {
            this.triggerGameComplete();
        }
    }

    private isGamecomplete(): boolean {
        return this.boardState.num2s3s === 0;
    }

    private triggerGameOver(): void {
        this.boardState.gameOver = true;
        alert("Game over!");
        this.flipBoard(true);
        this.boardState.level =
            this.boardState.level > 1 ? this.boardState.level - 1 : 1;
    }

    private triggerGameComplete(): void {
        this.boardState.gameOver = true;
        alert("You won!");
        this.flipBoard(true);
        this.boardState.totalCoins += this.boardState.coinsThisLevel;
        this.boardState.level++;
    }

    private flipBoard(reveal: boolean): void {
        const grid = this.boardState.grid;
        grid.forEach((row) => {
            row.forEach((col) => {
                col.revealed = reveal;
            });
        });
    }
}

export default BoardListener;
