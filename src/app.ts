const BOARD_SIZE = 5;
const TILE_COUNT = BOARD_SIZE * BOARD_SIZE;

type Tile = {
    isVoltorb: boolean;
    value: number;
    isRevealed: boolean;
};

const levels = {
    "1": [
        // 2s, 3s, Voltorbs
        [5, 0, 6],
        [4, 1, 6],
        [3, 1, 6],
        [2, 2, 6],
        [0, 3, 6],
    ],

    "2": [
        [6, 0, 7],
        [5, 1, 7],
        [3, 2, 7],
        [1, 3, 7],
        [0, 4, 7],
    ],

    "3": [
        [7, 0, 8],
        [6, 1, 8],
        [4, 2, 8],
        [2, 3, 8],
        [1, 4, 8],
    ],

    "4": [
        [8, 0, 10],
        [5, 2, 10],
        [3, 3, 8],
        [2, 4, 10],
        [0, 5, 8],
    ],

    "5": [
        [9, 0, 10],
        [7, 1, 10],
        [6, 2, 10],
        [4, 3, 10],
        [1, 5, 10],
    ],

    "6": [
        [8, 1, 10],
        [5, 3, 10],
        [3, 4, 10],
        [2, 5, 10],
        [0, 6, 10],
    ],

    "7": [
        [9, 1, 13],
        [7, 2, 10],
        [6, 3, 10],
        [4, 4, 10],
        [1, 6, 13],
    ],
    "8": [
        [0, 7, 10],
        [8, 2, 10],
        [5, 4, 10],
        [2, 6, 10],
        [7, 3, 10],
    ],
};

function generateBoard(): Tile[][] {
    const [num2s, num3s, numVoltorbs] = levels[1][3];
    const num1s = TILE_COUNT - num2s - num3s - numVoltorbs;
    const tiles = [
        ...createTileArray(numVoltorbs, 0),
        ...createTileArray(num1s, 1),
        ...createTileArray(num2s, 2),
        ...createTileArray(num3s, 3)
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

function createTileArray(num: number, value: number): Tile[] {
    return Array(num).fill(value).map(v => createTile(v))
}

function createTile(value: number): Tile {
    return {
        isVoltorb: value == 0,
        value: value,
        isRevealed: true
    }
}

function renderBoard(board: Tile[][]): void {
    const gameBoard: HTMLElement | null = document.getElementById("game-board");
    gameBoard!!.innerHTML = "";

    board.forEach((row, i) => {
        row.forEach((tile, j) => {
            const tileElement = document.createElement("div");
            tileElement.className = "tile";
            tileElement.textContent = tile.isRevealed
                ? tile.isVoltorb
                    ? "💣"
                    : tile.value.toString()
                : "";
            tileElement.addEventListener("click", () =>
                revealTile(board, i, j)
            );
            gameBoard?.appendChild(tileElement);
        });
    });
}

function revealTile(board: Tile[][], i: number, j: number): any {
    const tile = board[i][j];
    tile.isRevealed = true;
    renderBoard(board);
}

const board = generateBoard();
renderBoard(board);
