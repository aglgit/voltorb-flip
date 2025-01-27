import { BOARD_SIZE } from "@src/types/constants";
import { Tile, TileSum } from "@src/types/tiles";
import BoardListener from "./boardListener";
import BoardState from "./boardState";

class BoardRenderer {
    boardListener: BoardListener;
    boardState: BoardState;

    public constructor(boardListener: BoardListener, boardState: BoardState) {
        this.boardListener = boardListener;
        this.boardState = boardState;
    }

    public firstRenderGame(): void {
        this.renderInfo();
        this.renderBoard();
        this.renderMemoButton();
        this.addEventListeners();
    }

    public renderGame(): void {
        this.renderGameAlert();
        this.renderInfo();
        this.renderBoard();
        this.renderMemoButton();
    }

    private renderGameAlert() {
        if (this.boardState.gameWon) {
            alert("You won!");
        } else if (this.boardState.gameOver) {
            alert("Game over!");
        }
    }

    private renderInfo(): void {
        const levelElement = document.getElementById("info-level");
        levelElement!.textContent = `Level: \n${this.boardState.level}`;
        const coinsElement = document.getElementById("info-coins");
        coinsElement!.textContent = `Total coins: \n${this.boardState.totalCoins}`;
        const levelCoinsElement = document.getElementById("info-coins-level");
        levelCoinsElement!.textContent = `Coins this level: \n${this.boardState.coinsThisLevel}`;
    }

    private renderBoard(): void {
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
            tileElement.textContent = `0${colSums[j].sumValue}\n💣:${colSums[j].sumVoltorb}`;
        } else if (j === BOARD_SIZE) {
            tileElement.textContent = `0${rowSums[i].sumValue}\n💣:${rowSums[i].sumVoltorb}`;
        }
    }

    private renderGameTile(
        tileElement: HTMLDivElement,
        tile: Tile,
        i: number,
        j: number
    ): void {
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

    private renderMemoButton(): void {
        const memoButton = document.getElementById("memo-button-toggle");
        memoButton!.textContent = this.boardState.memoMode
            ? "Memo Mode: ON"
            : "Memo Mode: OFF";
    }

    private addEventListeners(): void {
        document.addEventListener("keydown", (event) => {
            this.boardListener.keyPressListener(event);
            this.renderGame();
        });

        const memoButton = document.getElementById("memo-button-toggle");
        memoButton?.addEventListener("click", () => {
            this.boardState.toggleMemoMode();
            this.renderGame();
        });

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

        const playbutton = document.getElementById("playbutton");
        playbutton?.addEventListener("click", () => {
            this.showVideoPlayer();
        });
    }

    private showVideoPlayer() {
        const wrapper = document.getElementById("video-wrapper");
        wrapper!.innerHTML = `
        <iframe
            src="https://www.youtube-nocookie.com/embed/gRXcyH1JdCI?si=reyhs21yrvFSsDS5"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
        <button id="close-button">Close</button>
        `;

        const closeButton = document.getElementById("close-button");
        closeButton?.addEventListener("click", () => {
            this.hideVideoPlayer();
        });
    }

    private hideVideoPlayer() {
        const wrapper = document.getElementById("video-wrapper");
        wrapper!.innerHTML = `
            <img
                id="playbutton"
                src="public/images/playbutton.png"
                alt="Play Button"
            />
            `;

        const playbutton = document.getElementById("playbutton");
        playbutton?.addEventListener("click", () => this.showVideoPlayer());
    }
}

export default BoardRenderer;
