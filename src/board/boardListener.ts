import { Tile } from "@src/types/tiles";
import BoardContainer from "./boardContainer";

class BoardListener {
    public numberButtonClickListener(
        boardContainer: BoardContainer,
        mark: number
    ): void {
        const tile = boardContainer.activeTile;
        if (tile != null) {
            if (tile.marks.has(mark)) {
                tile.marks.delete(mark);
            } else {
                tile.marks.add(mark);
            }
        }
        boardContainer.renderGame();
    }

    public gameTileClickListener(
        boardContainer: BoardContainer,
        tile: Tile
    ): void {
        if (boardContainer.gameOver) {
            boardContainer.resetBoard();
        } else if (boardContainer.memoMode) {
            boardContainer.grid.flat().forEach((tile) => {
                tile.selected = false;
            });
            tile.selected = true;
        } else {
            this.revealTile(boardContainer, tile);
        }
        boardContainer.renderGame();
    }

    private revealTile(boardContainer: BoardContainer, tile: Tile) {
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

    private triggerGameOver(boardContainer: BoardContainer) {
        boardContainer.gameOver = true;
        alert("Game over!");
        this.flipBoard(true, boardContainer);
        boardContainer.level =
            boardContainer.level > 1 ? boardContainer.level - 1 : 1;
    }

    private triggerGameComplete(boardContainer: BoardContainer) {
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
