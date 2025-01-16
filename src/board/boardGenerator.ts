import { LevelData } from "../types/levels";
import { Tile } from "../types/tiles";

class BoardGenerator {
    public generateBoard(levelData: LevelData, boardSize: number): Tile[][] {
        const [num2s, num3s, numVoltorbs] = levelData;
        const num1s = boardSize * boardSize - num2s - num3s - numVoltorbs;
        const tiles = [
            ...this.createTileArray(numVoltorbs, 0),
            ...this.createTileArray(num1s, 1),
            ...this.createTileArray(num2s, 2),
            ...this.createTileArray(num3s, 3),
        ];

        // shuffle tiles with Fisher-Yates
        for (let i = tiles.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }

        // convert 1d array to 2d grid
        const grid = [];
        for (let i = 0; i < boardSize; i++) {
            grid.push(tiles.slice(i * boardSize, (i + 1) * boardSize));
        }

        console.log(grid);
        return grid;
    }

    private createTileArray(num: number, value: number): Tile[] {
        return Array(num)
            .fill(value)
            .map((v) => this.createTile(v));
    }

    private createTile(value: number): Tile {
        return {
            isVoltorb: value === 0,
            value: value,
            isRevealed: false,
        };
    }
}

export default BoardGenerator;
