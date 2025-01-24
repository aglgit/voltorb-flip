import { expect, test } from "vitest";
import BoardGenerator from "@src/board/boardGenerator";
import BoardCalculator from "../boardCalculator";
import BoardState from "../boardState";

const boardGenerator: BoardGenerator = new BoardGenerator();
const boardCalculator: BoardCalculator = new BoardCalculator();
const boardState: BoardState = new BoardState(boardGenerator, boardCalculator);

test("Reset board ensures correct state", () => {
    boardState.gameOver = true;
    boardState.coinsThisLevel = 300;
    boardState.selectedTile = boardState.grid[1][1];
    boardState.selectedRow = 1;
    boardState.selectedCol = 1;

    boardState.resetBoard();

    expect(boardState.gameOver).toBe(false);
    expect(boardState.coinsThisLevel).toBe(0);
    expect(boardState.selectedTile).toBe(boardState.grid[0][0]);
    expect(boardState.selectedRow).toBe(0);
    expect(boardState.selectedCol).toBe(0);
});

test("Toggle memo flips value", () => {
    boardState.memoMode = true;

    boardState.toggleMemoMode();
    expect(boardState.memoMode).toBe(false);
    boardState.toggleMemoMode();
    expect(boardState.memoMode).toBe(true);
});
