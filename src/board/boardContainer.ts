import BoardCalculator from "./boardCalculator";
import BoardGenerator from "./boardGenerator";
import { BOARD_SIZE } from "@src/types/constants";
import { LEVELS, NUM_BOARDS_PER_LEVEL } from "@src/types/levels";
import { Tile, TileSum } from "@src/types/tiles";
import BoardListener from "./boardListener";

class BoardContainer {
    boardGenerator: BoardGenerator;
    boardCalculator: BoardCalculator;
    boardListener: BoardListener;
    grid: Tile[][];
    selectedTile: Tile;
    selectedRow: number;
    selectedCol: number;
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
        boardCalculator: BoardCalculator,
        boardListener: BoardListener
    ) {
        this.boardGenerator = boardGenerator;
        this.boardCalculator = boardCalculator;
        this.boardListener = boardListener;
        this.grid = [];
        this.rowSums = [];
        this.colSums = [];
        this.level = 1;
        this.gameOver = false;
        this.memoMode = false;
        this.totalCoins = 0;
        this.coinsThisLevel = 0;
        this.num2s3s = 0;

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

        document.addEventListener("keydown", (event) => {
            this.boardListener.keyPressListener(this, event);
            this.renderGame();
        });
    }

    public resetBoard(): void {
        this.gameOver = false;
        this.coinsThisLevel = 0;
        this.num2s3s = 0;

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

        const grid = this.grid;
        const rowSums = this.rowSums;
        const colSums = this.colSums;
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
        if (tile == this.selectedTile && this.memoMode) {
            tileElement.classList.add("selected-memo");
        } else if (tile == this.selectedTile) {
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
            this.boardListener.gameTileRevealListener(this, tile, i, j);
            this.renderGame();
        });
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
            this.renderGame();
        });
    }

    private renderNumberButtons(): void {
        const button0 = document.getElementById("memo-button-0");
        button0?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(this, 0);
            this.renderGame();
        });
        const button1 = document.getElementById("memo-button-1");
        button1?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(this, 1);
            this.renderGame();
        });
        const button2 = document.getElementById("memo-button-2");
        button2?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(this, 2);
            this.renderGame();
        });
        const button3 = document.getElementById("memo-button-3");
        button3?.addEventListener("click", () => {
            this.boardListener.gameTileMarkListener(this, 3);
            this.renderGame();
        });
    }

    public toggleMemoMode(): void {
        this.memoMode = !this.memoMode;
    }
}

export default BoardContainer;
