import { expect, test } from "vitest";
import BoardCalculator from "@src/board/boardCalculator";
import { testGrid } from "./testGrid";

const boardCalculator: BoardCalculator = new BoardCalculator();

test("Calculator computes correct sums", () => {
    const grid = testGrid;

    const [rowSums, colSums] = boardCalculator.calculateRowSums(grid);

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
