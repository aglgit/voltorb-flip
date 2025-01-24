import { Tile } from "@src/types/tiles";
import BoardContainer from "./boardContainer";
import { BOARD_SIZE } from "@src/types/constants";

class BoardListener {
    public gameTileMarkListener(
        boardContainer: BoardContainer,
        mark: number
    ): void {
        const tile = boardContainer.selectedTile;
        this.toggleMark(tile, mark);
    }

    public gameTileRevealListener(
        boardContainer: BoardContainer,
        tile: Tile,
        i: number,
        j: number
    ): void {
        if (boardContainer.gameOver) {
            boardContainer.resetBoard();
        } else if (boardContainer.memoMode) {
            boardContainer.selectedTile = tile;
            boardContainer.selectedRow = i;
            boardContainer.selectedCol = j;
        } else {
            boardContainer.selectedTile = tile;
            boardContainer.selectedRow = i;
            boardContainer.selectedCol = j;
            this.revealTile(boardContainer, tile);
        }
    }

    public keyPressListener(
        boardContainer: BoardContainer,
        event: KeyboardEvent
    ): void {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                if (boardContainer.selectedRow > 0) {
                    boardContainer.selectedRow--;
                    boardContainer.selectedTile =
                        boardContainer.grid[boardContainer.selectedRow][
                            boardContainer.selectedCol
                        ];
                }
                break;
            case "ArrowDown":
                event.preventDefault();
                if (boardContainer.selectedRow < BOARD_SIZE - 1) {
                    boardContainer.selectedRow++;
                    boardContainer.selectedTile =
                        boardContainer.grid[boardContainer.selectedRow][
                            boardContainer.selectedCol
                        ];
                }
                break;
            case "ArrowLeft":
                event.preventDefault();
                if (boardContainer.selectedCol > 0) {
                    boardContainer.selectedCol--;
                    boardContainer.selectedTile =
                        boardContainer.grid[boardContainer.selectedRow][
                            boardContainer.selectedCol
                        ];
                }
                break;
            case "ArrowRight":
                event.preventDefault();
                if (boardContainer.selectedCol < BOARD_SIZE - 1) {
                    boardContainer.selectedCol++;
                    boardContainer.selectedTile =
                        boardContainer.grid[boardContainer.selectedRow][
                            boardContainer.selectedCol
                        ];
                }
                break;
            case "Enter":
                this.gameTileRevealListener(
                    boardContainer,
                    boardContainer.selectedTile,
                    boardContainer.selectedRow,
                    boardContainer.selectedCol
                );
                break;
            case "0":
            case "1":
            case "2":
            case "3": {
                const tile = boardContainer.selectedTile;
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

    private revealTile(boardContainer: BoardContainer, tile: Tile): void {
        tile.revealed = true;
        if (tile.voltorb) {
            this.triggerGameOver(boardContainer);
        } else {
            if (tile.value > 1) {
                boardContainer.num2s3s--;
            }
            boardContainer.coinsThisLevel =
                boardContainer.coinsThisLevel > 0
                    ? boardContainer.coinsThisLevel * tile.value
                    : tile.value;
        }
        if (this.isGamecomplete(boardContainer)) {
            this.triggerGameComplete(boardContainer);
        }
    }

    private isGamecomplete(boardContainer: BoardContainer): boolean {
        return boardContainer.num2s3s === 0;
    }

    private triggerGameOver(boardContainer: BoardContainer): void {
        boardContainer.gameOver = true;
        alert("Game over!");
        this.flipBoard(true, boardContainer);
        boardContainer.level =
            boardContainer.level > 1 ? boardContainer.level - 1 : 1;
    }

    private triggerGameComplete(boardContainer: BoardContainer): void {
        boardContainer.gameOver = true;
        alert("You won!");
        this.flipBoard(true, boardContainer);
        boardContainer.totalCoins += boardContainer.coinsThisLevel;
        boardContainer.level++;
    }

    private flipBoard(reveal: boolean, boardContainer: BoardContainer): void {
        const grid = boardContainer.grid;
        grid.forEach((row) => {
            row.forEach((col) => {
                col.revealed = reveal;
            });
        });
    }
}

export default BoardListener;
