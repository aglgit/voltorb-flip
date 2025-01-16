import BoardCalculator from "./boardCalculator";
import BoardGenerator from "./boardGenerator";
import { LEVELS } from "../types/levels";
import { Tile, TileSum } from "../types/tiles";
import { BOARD_SIZE } from "../types/constants";

class BoardGame {
    boardGenerator: BoardGenerator;
    boardCalculator: BoardCalculator;
    grid: Tile[][];
    rowSums: TileSum[];
    colSums: TileSum[];
    level: number;
    totalCoins: number;
    coinsThisLevel: number;
    gameOver: boolean;
    num2s3s: number;

    public constructor(
        boardGenerator: BoardGenerator,
        boardCalculator: BoardCalculator
    ) {
        this.boardGenerator = boardGenerator;
        this.boardCalculator = boardCalculator;
        this.grid = [];
        this.rowSums = [];
        this.colSums = [];
        this.level = 1;
        this.gameOver = false;
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
    }

    private regenerateBoard(): void {
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

        const tiles = this.grid;
        const rowSums = this.rowSums;
        const colSums = this.colSums;
        for (let i = 0; i <= BOARD_SIZE; i++) {
            for (let j = 0; j <= BOARD_SIZE; j++) {
                const tileElement = document.createElement("div");
                if (i == 5 && j == 5) {
                    tileElement.className = "empty-tile";
                } else if (i == 5 || j == 5) {
                    this.createInfoTile(tileElement, rowSums, colSums, i, j);
                } else {
                    this.createGameTile(tileElement, tiles, i, j);
                }
                gameBoard?.appendChild(tileElement);
            }
        }
    }

    private createInfoTile(
        tileElement: HTMLDivElement,
        rowSums: TileSum[],
        colSums: TileSum[],
        i: number,
        j: number
    ): void {
        tileElement.className = "info-tile";
        if (i == 5) {
            tileElement.textContent = `0${colSums[j].sumValue}\n${colSums[j].sumVoltorb}`;
        } else if (j == 5) {
            tileElement.textContent = `0${rowSums[i].sumValue}\n${rowSums[i].sumVoltorb}`;
        }
    }

    private createGameTile(
        tileElement: HTMLDivElement,
        tiles: Tile[][],
        row: number,
        col: number
    ): void {
        tileElement.className = "game-tile";
        const tile = tiles[row][col];
        tileElement.textContent = tile.isRevealed
            ? tile.isVoltorb
                ? "💣"
                : tile.value.toString()
            : "";
        tileElement.addEventListener("click", () =>
            this.clickListener(row, col)
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

    private clickListener(row: number, col: number): void {
        if (this.gameOver) {
            this.regenerateBoard();
        } else {
            this.revealTile(row, col);
        }
        this.renderGame();
    }

    private revealTile(row: number, col: number) {
        const tile = this.grid[row][col];
        tile.isRevealed = true;
        if (tile.isVoltorb) {
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
        const tiles = this.grid;
        tiles.forEach((row) => {
            row.forEach((col) => {
                col.isRevealed = reveal;
            });
        });
    }
}

export default BoardGame;
