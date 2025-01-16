import { expect, test } from "vitest";
import { LEVELS } from "../src/types/levels";
import { BOARD_SIZE } from "../src/types/constants";
import BoardCalculator from "../src/board/BoardCalculator";
import { TileSum } from "../src/types/tiles";

const boardCalculator: BoardCalculator = new BoardCalculator();

test("Calculator computes correct sums", () => {
    const grid = testGrid;
    let rowSums: TileSum[];
    let colSums: TileSum[];

    [rowSums, colSums] = boardCalculator.calculateRowSums(grid);

    const expectedRowSums = [
        {
            sumValue: 3,
            sumVoltorb: 2,
        },
        {
            sumValue: 3,
            sumVoltorb: 2,
        },
        {
            sumValue: 7,
            sumVoltorb: 1,
        },
        {
            sumValue: 7,
            sumVoltorb: 0,
        },
        {
            sumValue: 5,
            sumVoltorb: 1,
        },
    ];
    const expectedColSums = [
        {
            sumValue: 6,
            sumVoltorb: 0,
        },
        {
            sumValue: 6,
            sumVoltorb: 1,
        },
        {
            sumValue: 3,
            sumVoltorb: 2,
        },
        {
            sumValue: 4,
            sumVoltorb: 1,
        },
        {
            sumValue: 6,
            sumVoltorb: 2,
        },
    ];
    expect(rowSums).toStrictEqual(expectedRowSums);
    expect(colSums).toStrictEqual(expectedColSums);
});

test("Calculator computes correct number of 2s and 3s", () => {
    const grid = testGrid;

    const num2s3s = boardCalculator.calculateNum2s3s(grid);

    expect(num2s3s).toStrictEqual(4);
});

const testGrid = [
    [
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: true,
            value: 0,
            isRevealed: false,
        },
        {
            isVoltorb: true,
            value: 0,
            isRevealed: false,
        },
    ],
    [
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: true,
            value: 0,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: true,
            value: 0,
            isRevealed: false,
        },
    ],
    [
        {
            isVoltorb: false,
            value: 2,
            isRevealed: false,
        },
        {
            isVoltorb: true,
            value: 0,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 3,
            isRevealed: false,
        },
    ],
    [
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 3,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
    ],
    [
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: true,
            value: 0,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 1,
            isRevealed: false,
        },
        {
            isVoltorb: false,
            value: 2,
            isRevealed: false,
        },
    ],
];
