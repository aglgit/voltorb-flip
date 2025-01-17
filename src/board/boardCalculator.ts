import { Tile, TileSum } from "@src/types/tiles";

class BoardCalculator {
    public calculateRowSums(grid: Tile[][]): [TileSum[], TileSum[]] {
        const colSums = Array(grid[0].length)
            .fill(0)
            .map(() => {
                return { sumValue: 0, sumVoltorb: 0 };
            });
        const rowSums = Array(grid[0].length)
            .fill(0)
            .map(() => {
                return { sumValue: 0, sumVoltorb: 0 };
            });
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                rowSums[i].sumValue += grid[i][j].value;
                colSums[j].sumValue += grid[i][j].value;
                if (grid[i][j].isVoltorb) {
                    rowSums[i].sumVoltorb++;
                    colSums[j].sumVoltorb++;
                }
            }
        }
        console.log(rowSums, colSums);
        return [rowSums, colSums];
    }

    public calculateNum2s3s(grid: Tile[][]): number {
        let num2s3s = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                const tile = grid[i][j];
                if (tile.value > 1) {
                    num2s3s++;
                }
            }
        }
        return num2s3s;
    }
}

export default BoardCalculator;
