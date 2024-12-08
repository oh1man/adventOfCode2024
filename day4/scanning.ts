/**
 * Logical class for defining a scan of a specified length and direction.
 */
export class Scan2D {
    private input: any[][];

    constructor(input: any[][]) {
        this.input = input;
    }

    /**
     * Returns a one-dimensional list of the elements from the input based on the current coordinate.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param direction The direction we want to return a list of elements from.
     * @param numberOfElements The number of elements we want to include in the scan.
     */
    public getOneDirectionalScan(
        x: number,
        y: number,
        horizontal: Horizontal,
        vertical: Vertical,
        numberOfElements: number,
    ): [string[], number[][]] {
        const scan: any[] = [];
        const coordinates: number[][] = [];
        for (let i = 0; i < numberOfElements; i++) {
            const [_x, _y] = getDirectionalCoordinate(
                horizontal,
                vertical,
                x,
                y,
                i,
            );
            try {
                scan.push(this.input[_y][_x]);
                coordinates.push([_x, _y]);
            } catch (e) {
                //console.log("Out of bound")
            }
        }
        return [scan, coordinates];
    }

    public getDiagonals(
        x: number,
        y: number,
        numberOfElementsFromMidPoint: number,
    ) {
        const diagonal1: string[] = [];
        const coordinates1: number[][] = [];
        const diagonal2: string[] = [];
        const coordinates2: number[][] = [];
        for (let i = -numberOfElementsFromMidPoint; i <= numberOfElementsFromMidPoint; i++) {
            const _x1 = x + i;
            const _y1 = y - i;
            try {
                diagonal1.push(this.input[_y1][_x1]);
                coordinates1.push([_x1, _y1]);
            } catch (e) {}
            const _x2 = x + i;
            const _y2 = y + i;
            try {
                diagonal2.push(this.input[_y2][_x2]);
                coordinates2.push([_x2, _y2]);
            } catch (e) {}
        }
        return [diagonal1, diagonal2];
    }
}

export enum Vertical {
    UP = "UP",
    DOWN = "DOWN",
    NONE = "NONE",
}

export enum Horizontal {
    RIGHT = "RIGHT",
    LEFT = "LEFT",
    NONE = "NONE",
}

export function getDirectionalCoordinate(
    horizontal: Horizontal,
    vertical: Vertical,
    x: number,
    y: number,
    stepSize: number = 1,
) {
    return [getX(horizontal, x, stepSize), getY(vertical, y, stepSize)];
}

function getX(horizontal: Horizontal, x: number, stepSize: number) {
    switch (horizontal) {
        case Horizontal.RIGHT:
            return x + stepSize;
        case Horizontal.LEFT:
            return x - stepSize;
        case Horizontal.NONE:
            return x;
        default:
            throw new Error("Invalid horizontal direction");
    }
}

function getY(vertical: Vertical, y: number, stepSize: number) {
    switch (vertical) {
        case Vertical.UP:
            return y - stepSize;
        case Vertical.DOWN:
            return y + stepSize;
        case Vertical.NONE:
            return y;
        default:
            throw new Error("Invalid vertical direction");
    }
}
