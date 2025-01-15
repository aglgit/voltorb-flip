import { LEVELS } from "./levels";

const BOARD_SIZE = 5;
const TILE_COUNT = BOARD_SIZE * BOARD_SIZE;

type Tile = {
    isVoltorb: boolean;
    value: number;
    isRevealed: boolean;
};

type TileSum = {
    sumValue: number;
    sumVoltorb: number;
};

class GameBoard {
    grid: Tile[][];
    rowSums: TileSum[];
    colSums: TileSum[];
    level: number;
    totalCoins: number;
    coinsThisLevel: number;
    gameOver: boolean;
    num2s3s: number;

    constructor() {
        this.grid = [];
        this.rowSums = [];
        this.colSums = [];
        this.level = 1;
        this.gameOver = false;
        this.totalCoins = 0;
        this.coinsThisLevel = 0;
        this.num2s3s = 0;

        this.generateBoard();
        this.calculateRowSums();
    }

    regenerateBoard(): void {
        this.gameOver = false;
        this.coinsThisLevel = 0;
        this.num2s3s = 0;

        this.generateBoard();
        this.calculateRowSums();
    }

    generateBoard(): void {
        const [num2s, num3s, numVoltorbs] =
            LEVELS[this.level.toString()][Math.floor(Math.random() * 5)];
        const num1s = TILE_COUNT - num2s - num3s - numVoltorbs;
        const tiles = [
            ...this.createTileArray(numVoltorbs, 0),
            ...this.createTileArray(num1s, 1),
            ...this.createTileArray(num2s, 2),
            ...this.createTileArray(num3s, 3),
        ];

        for (let i = tiles.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }

        const grid = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            grid.push(tiles.slice(row * BOARD_SIZE, (row + 1) * BOARD_SIZE));
        }

        this.num2s3s = num2s + num3s;
        this.grid = grid;
        console.log(this.grid);
    }

    createTileArray(num: number, value: number): Tile[] {
        return Array(num)
            .fill(value)
            .map((v) => this.createTile(v));
    }

    createTile(value: number): Tile {
        return {
            isVoltorb: value === 0,
            value: value,
            isRevealed: false,
        };
    }

    calculateRowSums(): void {
        const colSums = Array(this.grid[0].length)
            .fill(0)
            .map(() => {
                return { sumValue: 0, sumVoltorb: 0 };
            });
        const rowSums = Array(this.grid[0].length)
            .fill(0)
            .map(() => {
                return { sumValue: 0, sumVoltorb: 0 };
            });
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                rowSums[i].sumValue += this.grid[i][j].value;
                colSums[j].sumValue += this.grid[i][j].value;
                if (this.grid[i][j].isVoltorb) {
                    rowSums[i].sumVoltorb++;
                    colSums[j].sumVoltorb++;
                }
            }
        }
        [this.rowSums, this.colSums] = [rowSums, colSums];
    }

    renderGame(): void {
        this.renderBoard();
        this.renderInfo();
    }

    renderBoard() {
        const gameBoard: HTMLElement | null =
            document.getElementById("game-board");
        gameBoard!.innerHTML = "";

        const tiles = this.grid;
        const rowSums = this.rowSums;
        const colSums = this.colSums;
        for (let row = 0; row <= BOARD_SIZE; row++) {
            for (let col = 0; col <= BOARD_SIZE; col++) {
                const tileElement = document.createElement("div");
                if (row == 5 && col == 5) {
                    tileElement.className = "empty-tile";
                } else if (row == 5 || col == 5) {
                    this.createInfoTile(
                        tileElement,
                        row,
                        colSums,
                        col,
                        rowSums
                    );
                } else {
                    this.createGameTile(tileElement, tiles, row, col);
                }
                gameBoard?.appendChild(tileElement);
            }
        }
    }

    createInfoTile(
        tileElement: HTMLDivElement,
        row: number,
        colSums: TileSum[],
        col: number,
        rowSums: TileSum[]
    ): void {
        tileElement.className = "info-tile";
        if (row == 5) {
            tileElement.textContent = `0${colSums[col].sumValue}\n${colSums[col].sumVoltorb}`;
        } else if (col == 5) {
            tileElement.textContent = `0${rowSums[row].sumValue}\n${rowSums[row].sumVoltorb}`;
        }
    }

    createGameTile(
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

    renderInfo(): void {
        const levelElement = document.getElementById("info-level");
        levelElement!.textContent = `Level: \n${this.level}`;
        const coinsElement = document.getElementById("info-coins");
        coinsElement!.textContent = `Total coins: \n${this.totalCoins}`;
        const levelCoinsElement = document.getElementById("info-coins-level");
        levelCoinsElement!.textContent = `Coins this level: \n${this.coinsThisLevel}`;
    }

    clickListener(row: number, col: number): void {
        if (this.gameOver) {
            this.regenerateBoard();
        } else {
            this.revealTile(row, col);
        }
        this.renderGame();
    }

    revealTile(row: number, col: number) {
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

    isGamecomplete(): boolean {
        return this.num2s3s === 0;
    }

    triggerGameOver() {
        this.gameOver = true;
        alert("Game over!");
        this.flipBoard(true);
        this.level = this.level > 1 ? this.level - 1 : 1;
    }

    triggerGameComplete() {
        this.gameOver = true;
        alert("You won!");
        this.flipBoard(true);
        this.totalCoins += this.coinsThisLevel;
        this.level++;
    }

    flipBoard(reveal: boolean): void {
        const tiles = this.grid;
        tiles.forEach((row) => {
            row.forEach((col) => {
                col.isRevealed = reveal;
            });
        });
    }
}

export default GameBoard;
