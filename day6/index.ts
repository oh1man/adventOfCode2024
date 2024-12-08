import {createMatrix, readFileToString} from "../utils/FileUtilities.ts";
import {Direction, Guard, ObstacleError} from "./guard.ts";

const input = await readFileToString("./day6/input.txt");
const map = createMatrix(input);

function findStartingPoint(map: string[][]) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] == "^") {
                return [row, col];
            }
        }
    }
    throw new Error("No starting point found.");
}

const [row, col] = findStartingPoint(map);
const guard = new Guard(map, col, row, Direction.UP);
const locations = new Set<string>();
while (true) {
    try {
        locations.add(guard.getLocation().join(","))
        guard.step();
    } catch (error) {
        if (error instanceof ObstacleError) {
            console.log("Aj va fan! - Turning right!")
            guard.rotate()
        } else {
            console.log("Going Home")
            break
        }
    }
}
console.log("Day 6")
