import { LEVELS } from "./LEVELS";

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
    tiles: Tile[][];
    rowSums: TileSum[];
    colSums: TileSum[];
    level: number;
    totalCoins: number;
    coinsThisLevel: number;
    gameover: boolean;

    constructor() {
        this.level = 1;
        this.totalCoins = 0;
        this.coinsThisLevel = 0;
        this.gameover = false;
        this.tiles = this.generateBoard();
        [this.rowSums, this.colSums] = this.calculateRowSums();
    }

    calculateRowSums(): TileSum[][] {
        const colSums = Array(this.tiles[0].length)
            .fill(0)
            .map((v) => {
                return { sumValue: 0, sumVoltorb: 0 };
            });
        const rowSums = Array(this.tiles[0].length)
            .fill(0)
            .map((v) => {
                return { sumValue: 0, sumVoltorb: 0 };
            });
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles.length; j++) {
                rowSums[i].sumValue += this.tiles[i][j].value;
                colSums[j].sumValue += this.tiles[i][j].value;
                if (this.tiles[i][j].isVoltorb) {
                    rowSums[i].sumVoltorb++;
                    colSums[j].sumVoltorb++;
                }
            }
        }
        return [rowSums, colSums];
    }

    generateBoard(): Tile[][] {
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

        return grid;
    }

    createTileArray(num: number, value: number): Tile[] {
        return Array(num)
            .fill(value)
            .map((v) => this.createTile(v));
    }

    createTile(value: number): Tile {
        return {
            isVoltorb: value == 0,
            value: value,
            isRevealed: false,
        };
    }

    renderBoard(board: GameBoard): void {
        const gameBoard: HTMLElement | null =
            document.getElementById("game-board");
        gameBoard!!.innerHTML = "";

        const tiles = board.tiles;
        const rowSums = board.rowSums;
        const colSums = board.colSums;
        for (let row = 0; row <= BOARD_SIZE; row++) {
            for (let col = 0; col <= BOARD_SIZE; col++) {
                const tileElement = document.createElement("div");
                if (row == 5 && col == 5) {
                    tileElement.className = "empty-tile";
                } else if (row == 5 || col == 5) {
                    tileElement.className = "info-tile";
                    if (row == 5) {
                        tileElement.textContent = `0${colSums[col].sumValue}\n${colSums[col].sumVoltorb}`;
                    } else if (col == 5) {
                        tileElement.textContent = `0${rowSums[row].sumValue}\n${rowSums[row].sumVoltorb}`;
                    }
                } else {
                    tileElement.className = "game-tile";
                    const tile = tiles[row][col];
                    tileElement.textContent = tile.isRevealed
                        ? tile.isVoltorb
                            ? "💣"
                            : tile.value.toString()
                        : "";
                    tileElement.addEventListener("click", () =>
                        this.clickListener(board, row, col)
                    );
                }
                gameBoard?.appendChild(tileElement);
            }
        }

        this.renderInfo();
    }

    renderInfo(): void {
        const levelElement = document.getElementById("info-level");
        levelElement!!.textContent = `Level: \n${this.level}`;
        const coinsElement = document.getElementById("info-coins");
        coinsElement!!.textContent = `Total coins: \n${this.totalCoins}`;
        const levelCoinsElement = document.getElementById("info-coins-level");
        levelCoinsElement!!.textContent = `Coins this level: \n${this.coinsThisLevel}`;
    }

    clickListener(board: GameBoard, row: number, col: number): any {
        if (board.gameover) {
            this.coinsThisLevel = 0;
            this.tiles = this.generateBoard();
            [this.rowSums, this.colSums] = this.calculateRowSums();
            this.gameover = false;
            this.renderBoard(this);
        } else {
            const tile = board.tiles[row][col];
            tile.isRevealed = true;
            if (tile.isVoltorb) {
                board.gameover = true;
                alert("Game over!");
                this.flipBoard(board, true);
            } else {
                this.coinsThisLevel =
                    this.coinsThisLevel > 0
                        ? this.coinsThisLevel * tile.value
                        : tile.value;
            }
            this.renderBoard(board);
        }
    }

    flipBoard(board: GameBoard, reveal: boolean) {
        const tiles = board.tiles;
        tiles.forEach((row, i) => {
            row.forEach((col, i) => {
                col.isRevealed = reveal;
            });
        });
        this.renderBoard(board);
    }
}

const g = new GameBoard();
g.renderBoard(g);
