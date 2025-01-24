import BoardCalculator from "./boardCalculator";
import BoardGenerator from "./boardGenerator";
import { BOARD_SIZE } from "@src/types/constants";
import { Tile, TileSum } from "@src/types/tiles";
import BoardListener from "./boardListener";
import BoardState from "./boardState";

class BoardContainer {
    boardGenerator: BoardGenerator;
    boardCalculator: BoardCalculator;
    boardListener: BoardListener;
    boardState: BoardState;

    public constructor(
        boardGenerator: BoardGenerator,
        boardCalculator: BoardCalculator,
        boardListener: BoardListener,
        boardState: BoardState
    ) {
        this.boardGenerator = boardGenerator;
        this.boardCalculator = boardCalculator;
        this.boardListener = boardListener;
        this.boardState = boardState;

        document.addEventListener("keydown", (event) => {
            this.boardListener.keyPressListener(event);
            this.renderGame();
        });
    }

    public startGame(): void {
        this.renderBoard();
        this.renderInfo();
        this.renderMemoButton();
        this.renderNumberButtons();
    }

    public renderGame(): void {
        this.renderBoard();
        this.renderInfo();
    }

    private renderBoard() {
        const gameBoard: HTMLElement | null =
            document.getElementById("game-board");
        gameBoard!.innerHTML = "";

        const grid = this.boardState.grid;
        const rowSums = this.boardState.rowSums;
        const colSums = this.boardState.colSums;
        for (let i = 0; i <= BOARD_SIZE; i++) {
            for (let j = 0; j <= BOARD_SIZE; j++) {
                const tileElement = document.createElement("div");
                if (i === BOARD_SIZE && j === BOARD_SIZE) {
                    tileElement.className = "empty-tile";
                } else if (i === BOARD_SIZE || j === BOARD_SIZE) {
                    this.renderInfoTile(tileElement, rowSums, colSums, i, j);
                } else {
                    this.renderGameTile(tileElement, grid[i][j], i, j);
                }
                gameBoard?.appendChild(tileElement);
            }
        }
    }

    private renderInfoTile(
        tileElement: HTMLDivElement,
        rowSums: TileSum[],
        colSums: TileSum[],
        i: number,
        j: number
    ): void {
        tileElement.className = "info-tile";
        if (i === BOARD_SIZE) {
            tileElement.textContent = `Sum: 0${colSums[j].sumValue}\n💣:${colSums[j].sumVoltorb}`;
        } else if (j === BOARD_SIZE) {
            tileElement.textContent = `Sum: 0${rowSums[i].sumValue}\n💣:${rowSums[i].sumVoltorb}`;
        }
    }

    private renderGameTile(
        tileElement: HTMLDivElement,
        tile: Tile,
        i: number,
        j: number
    ): void {
        tileElement.tabIndex = 0;
        tileElement.className = "game-tile";
        if (tile == this.boardState.selectedTile && this.boardState.memoMode) {
            tileElement.classList.add("selected-memo");
        } else if (tile == this.boardState.selectedTile) {
            tileElement.classList.add("selected");
        }
        const marks = Array.from(tile.marks).sort();
        const marksStr = marks.length > 0 ? `[${marks.join(",")}]` : "";
        tileElement.textContent = tile.revealed
            ? tile.voltorb
                ? "💣"
                : tile.value.toString() + "\n" + marksStr
            : "" + marksStr;
        tileElement.addEventListener("click", () => {
            this.boardListener.gameTileRevealListener(tile, i, j);
            this.renderGame();
        });
    }

    private renderInfo(): void {
        const levelElement = document.getElementById("info-level");
        levelElement!.textContent = `Level: \n${this.boardState.level}`;
        const coinsElement = document.getElementById("info-coins");
        coinsElement!.textContent = `Total coins: \n${this.boardState.totalCoins}`;
        const levelCoinsElement = document.getElementById("info-coins-level");
        levelCoinsElement!.textContent = `Coins this level: \n${this.boardState.coinsThisLevel}`;
    }

    private renderMemoButton(): void {
        const memoButton = document.getElementById("memo-button-toggle");
        memoButton?.addEventListener("click", () => {
            this.boardState.toggleMemoMode();
            memoButton.textContent = this.boardState.memoMode
                ? "Memo Mode: ON"
                : "Memo Mode: OFF";
            this.renderGame();
        });
    }

    private renderNumberButtons(): void {
        const button0 = document.getElementById("memo-button-0");
        button0?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(0);
            this.renderGame();
        });
        const button1 = document.getElementById("memo-button-1");
        button1?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(1);
            this.renderGame();
        });
        const button2 = document.getElementById("memo-button-2");
        button2?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(2);
            this.renderGame();
        });
        const button3 = document.getElementById("memo-button-3");
        button3?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(3);
            this.renderGame();
        });
    }
}

export default BoardContainer;
