import { Tile } from "@src/types/tiles";
import BoardState from "./boardState";
import { Direction } from "../types/direction";

class BoardListener {
    boardState: BoardState;

    constructor(boardState: BoardState) {
        this.boardState = boardState;
    }

    public gameTileMarkListener(mark: number): void {
        this.boardState.toggleMark(mark);
    }

    public gameTileRevealListener(tile: Tile, i: number, j: number): void {
        if (this.boardState.gameOver || this.boardState.gameWon) {
            this.boardState.resetBoard();
        } else if (this.boardState.memoMode) {
            this.boardState.toggleSelectedTile(tile, i, j);
        } else {
            this.boardState.toggleSelectedTile(tile, i, j);
            this.boardState.revealTile(tile);
        }
    }

    public keyPressListener(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                this.boardState.moveSelectedTile(Direction.Up);
                break;
            case "ArrowDown":
                event.preventDefault();
                this.boardState.moveSelectedTile(Direction.Down);
                break;
            case "ArrowLeft":
                event.preventDefault();
                this.boardState.moveSelectedTile(Direction.Left);
                break;
            case "ArrowRight":
                event.preventDefault();
                this.boardState.moveSelectedTile(Direction.Right);
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
                const mark = parseInt(event.key);
                this.boardState.toggleMark(mark);
                break;
            }
        }
    }
}

export default BoardListener;
