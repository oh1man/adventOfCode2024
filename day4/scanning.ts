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
    public getOneDimensionalScan(
        x: number,
        y: number,
        direction: Direction,
        numberOfElements: number,
    ): any[] {
        const scan: any[] = [];
        const coordinates: number[][] = [];
        for (let i = 0; i < numberOfElements; i++) {
            let _x = x;
            let _y = y;
            switch (direction) {
                case Direction.HORIZONTAL:
                    _x = x + i;
                    break;
                case Direction.VERTICAL:
                    _y = y + i;
                    break;
                case Direction.RIGHT_DIAGONAL:
                    _x = x + i;
                    _y = y + i;
                    break;
                case Direction.LEFT_DIAGONAL:
                    _x = x - i;
                    _y = y + i;
                    break;
                default:
                    throw new Error("Invalid direction direction");
            }
            try {
                scan.push(this.input[_x][_y]);
                coordinates.push([_x, _y])
            } catch (e) {
                //console.log("Out of bound")
            }
        }
        return [scan, coordinates];
    }
}

export enum Direction {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL",
    RIGHT_DIAGONAL = "RIGHT_DIAGONAL",
    LEFT_DIAGONAL = "LEFT_DIAGONAL",
}
