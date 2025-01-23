export type Tile = {
    voltorb: boolean;
    value: number;
    revealed: boolean;
    marks: Set<number>;
};

export type TileSum = {
    sumValue: number;
    sumVoltorb: number;
};
