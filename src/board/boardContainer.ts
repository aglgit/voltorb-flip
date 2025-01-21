import BoardCalculator from "./boardCalculator";
import BoardGenerator from "./boardGenerator";
import { BOARD_SIZE } from "@src/types/constants";
import { LEVELS } from "@src/types/levels";
import { Tile, TileSum } from "@src/types/tiles";

class BoardContainer {
    boardGenerator: BoardGenerator;
    boardCalculator: BoardCalculator;
    grid: Tile[][];
    activeTile: Tile | null;
    rowSums: TileSum[];
    colSums: TileSum[];
    level: number;
    totalCoins: number;
    coinsThisLevel: number;
    gameOver: boolean;
    memoMode: boolean;
    num2s3s: number;

    public constructor(
        boardGenerator: BoardGenerator,
        boardCalculator: BoardCalculator
    ) {
        this.boardGenerator = boardGenerator;
        this.boardCalculator = boardCalculator;
        this.grid = [];
        this.activeTile = null;
        this.rowSums = [];
        this.colSums = [];
        this.level = 1;
        this.gameOver = false;
        this.memoMode = false;
        this.totalCoins = 0;
        this.coinsThisLevel = 0;
        this.num2s3s = 0;

        const levelData =
            LEVELS[this.level.toString()][Math.floor(Math.random() * 5)];
        this.grid = this.boardGenerator.generateBoard(levelData, BOARD_SIZE);
        [this.rowSums, this.colSums] = this.boardCalculator.calculateRowSums(
            this.grid
        );
        this.num2s3s = this.boardCalculator.calculateNum2s3s(this.grid);

        this.renderMemoButton();
        this.renderNumberButtons();
    }

    private resetBoard(): void {
        this.gameOver = false;
        this.coinsThisLevel = 0;
        this.num2s3s = 0;

        const levelData =
            LEVELS[this.level.toString()][Math.floor(Math.random() * 5)];
        this.grid = this.boardGenerator.generateBoard(levelData, BOARD_SIZE);
        [this.rowSums, this.colSums] = this.boardCalculator.calculateRowSums(
            this.grid
        );
        this.num2s3s = this.boardCalculator.calculateNum2s3s(this.grid);
    }

    public renderGame(): void {
        this.renderBoard();
        this.renderInfo();
    }

    private renderBoard() {
        const gameBoard: HTMLElement | null =
            document.getElementById("game-board");
        gameBoard!.innerHTML = "";

        const grid = this.grid;
        const rowSums = this.rowSums;
        const colSums = this.colSums;
        for (let i = 0; i <= BOARD_SIZE; i++) {
            for (let j = 0; j <= BOARD_SIZE; j++) {
                const tileElement = document.createElement("div");
                if (i === 5 && j === 5) {
                    tileElement.className = "empty-tile";
                } else if (i === 5 || j === 5) {
                    this.renderInfoTile(tileElement, rowSums, colSums, i, j);
                } else {
                    this.renderGameTile(tileElement, grid[i][j]);
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
        if (i === 5) {
            tileElement.textContent = `Sum: 0${colSums[j].sumValue}\n💣:${colSums[j].sumVoltorb}`;
        } else if (j === 5) {
            tileElement.textContent = `Sum: 0${rowSums[i].sumValue}\n💣:${rowSums[i].sumVoltorb}`;
        }
    }

    private renderGameTile(tileElement: HTMLDivElement, tile: Tile): void {
        tileElement.className = "game-tile";
        if (this.memoMode && tile.selected) {
            this.activeTile = tile;
            tileElement.classList.add("active");
        }
        const marks = Array.from(tile.marks).sort();
        const marksStr = marks.length > 0 ? `[${marks.join(",")}]` : "";
        tileElement.textContent = tile.revealed
            ? tile.voltorb
                ? "💣"
                : tile.value.toString() + "\n" + marksStr
            : "" + marksStr;
        tileElement.addEventListener("click", () =>
            this.gameTileClickListener(tile)
        );
    }

    private renderInfo(): void {
        const levelElement = document.getElementById("info-level");
        levelElement!.textContent = `Level: \n${this.level}`;
        const coinsElement = document.getElementById("info-coins");
        coinsElement!.textContent = `Total coins: \n${this.totalCoins}`;
        const levelCoinsElement = document.getElementById("info-coins-level");
        levelCoinsElement!.textContent = `Coins this level: \n${this.coinsThisLevel}`;
    }

    private renderMemoButton(): void {
        const memoButton = document.getElementById("memo-button-toggle");
        memoButton?.addEventListener("click", () => {
            this.toggleMemoMode();
            memoButton.textContent = this.memoMode
                ? "Memo Mode: ON"
                : "Memo Mode: OFF";
            const gridElement = document.querySelectorAll(".game-tile");
            gridElement.forEach((tile) => {
                tile.classList.remove("active");
            });
            this.renderGame();
        });
    }

    private numberButtonClickListener(value: number): void {
        const activeTile = this.activeTile;
        if (activeTile != null) {
            if (activeTile.marks.has(value)) {
                activeTile.marks.delete(value);
            } else {
                activeTile.marks.add(value);
            }
        }
        this.renderGame();
    }

    private renderNumberButtons(): void {
        const button0 = document.getElementById("memo-button-0");
        button0?.addEventListener("click", () => {
            this.numberButtonClickListener(0);
        });
        const button1 = document.getElementById("memo-button-1");
        button1?.addEventListener("click", () => {
            this.numberButtonClickListener(1);
        });
        const button2 = document.getElementById("memo-button-2");
        button2?.addEventListener("click", () => {
            this.numberButtonClickListener(2);
        });
        const button3 = document.getElementById("memo-button-3");
        button3?.addEventListener("click", () => {
            this.numberButtonClickListener(3);
        });
    }

    private toggleMemoMode(): void {
        this.memoMode = !this.memoMode;
    }

    private gameTileClickListener(tile: Tile): void {
        if (this.gameOver) {
            this.resetBoard();
        } else if (this.memoMode) {
            this.grid.flat().forEach((tile) => {
                tile.selected = false;
            });
            tile.selected = true;
        } else {
            this.revealTile(tile);
        }
        this.renderGame();
    }

    private revealTile(tile: Tile) {
        tile.revealed = true;
        if (tile.voltorb) {
            this.triggerGameOver();
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
            this.triggerGameComplete();
        }
    }

    private isGamecomplete(): boolean {
        return this.num2s3s === 0;
    }

    private triggerGameOver() {
        this.gameOver = true;
        alert("Game over!");
        this.flipBoard(true);
        this.level = this.level > 1 ? this.level - 1 : 1;
    }

    private triggerGameComplete() {
        this.gameOver = true;
        alert("You won!");
        this.flipBoard(true);
        this.totalCoins += this.coinsThisLevel;
        this.level++;
    }

    private flipBoard(reveal: boolean): void {
        const grid = this.grid;
        grid.forEach((row) => {
            row.forEach((col) => {
                col.revealed = reveal;
            });
        });
    }
}

export default BoardContainer;
