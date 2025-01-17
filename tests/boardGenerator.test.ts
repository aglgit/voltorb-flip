import { expect, test } from "vitest";
import BoardGenerator from "@src/board/boardGenerator";
import { BOARD_SIZE } from "@src/types/constants";
import { LEVELS } from "@src/types/levels";

const boardGenerator: BoardGenerator = new BoardGenerator();

test("Board has correct dimensions", () => {
    const levelData = LEVELS[1][2];
    const grid = boardGenerator.generateBoard(levelData, BOARD_SIZE);

    let size = 0;
    expect(grid.length).toBe(BOARD_SIZE);
    for (let i = 0; i < grid.length; i++) {
        expect(grid[i].length).toBe(BOARD_SIZE);
        for (let j = 0; j < grid[i].length; j++) {
            size++;
        }
    }
    expect(size).toBe(BOARD_SIZE * BOARD_SIZE);
});

test("Board has correct number of each tile", () => {
    const levelData = LEVELS[1][2];
    const grid = boardGenerator.generateBoard(levelData, BOARD_SIZE);

    const actual = { sumVoltorbs: 0, sum1s: 0, sum2s: 0, sum3s: 0 };
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].value == 0) actual.sumVoltorbs++;
            if (grid[i][j].value == 1) actual.sum1s++;
            if (grid[i][j].value == 2) actual.sum2s++;
            if (grid[i][j].value == 3) actual.sum3s++;
        }
    }
    const expected = { sumVoltorbs: 6, sum1s: 15, sum2s: 3, sum3s: 1 };
    expect(actual).toStrictEqual(expected);
});
