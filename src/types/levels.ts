export type LevelData = [number, number, number];

export type Levels = {
    [key: string]: LevelData[];
};

export const NUM_BOARDS_PER_LEVEL: number = 5;

export const LEVELS: Levels = {
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
