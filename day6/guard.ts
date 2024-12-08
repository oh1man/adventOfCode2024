/**
 * Represents a guard.
 */
export class Guard {
    private map: string[][];
    private x: number;
    private y: number;
    private direction: Direction;
    constructor(
        map: string[][],
        x: number,
        y: number,
        direction: Direction,
    ) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    getLocation(): [number, number] {
        return [this.x, this.y];
    }

    step() {
        const _x = this.x + this.direction[0];
        const _y = this.y + this.direction[1];
        const elementForward = this.map[_y][_x];
        if (elementForward === "#") {
            throw new ObstacleError("Obstacle");
        }
        this.x = _x;
        this.y = _y;
    }

    rotate() {
        switch (this.direction) {
            case Direction.UP:
                this.direction = Direction.RIGHT;
                break;
            case Direction.RIGHT:
                this.direction = Direction.DOWN;
                break;
            case Direction.DOWN:
                this.direction = Direction.LEFT;
                break;
            case Direction.LEFT:
                this.direction = Direction.UP;
                break;
            default:
                throw new Error("Invalid direction");
        }
    }
}

export class ObstacleError extends Error {}

export const Direction = {
    UP: [0, -1] as const,
    DOWN: [0, 1] as const,
    LEFT: [-1, 0] as const,
    RIGHT: [1, 0] as const,
} as const;

export type Direction = typeof Direction[keyof typeof Direction];
