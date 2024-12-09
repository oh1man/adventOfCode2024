import {createMatrix, readFileToString} from "../utils/FileUtilities.ts";
import {Direction, Guard, ObstacleError} from "./guard.ts";

const input = await readFileToString("./day6/testInput.txt");
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
        const location = guard.getLocation();
        locations.add(location[0].x + "," + location[0].y);
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

let part2 = 0;
for (const location of locations) {
    const split = location.split(",");
    if (Number(split[0]) === col && Number(split[1]) === row) {
        continue
    }
    if (isLoop(split[0], split[1])) {
        part2++;
    }
}



console.log("Day 6")
console.log("Part 1: " + locations.size)
console.log("Part 2: " + part2)

function isLoop(x: string, y: string): boolean {
    const guard2 = new Guard(map, col, row, Direction.UP);
    const directionalLocations = new Map<string, string[]>();
    while (true) {
        try {
            const directionalLocation = guard2.getLocation();
            const value = JSON.stringify(directionalLocation[0]);
            const directions = directionalLocations.get(value) ?? [];
            const directionString = JSON.stringify(directionalLocation[1]);
            if (directions.includes(directionString)) {
                return true
            } else {
                directions.push(directionString);
                directionalLocations.set(value, directions);
            }
            guard2.stepWithObstacle(Number(x), Number(y));
        } catch (error) {
            if (error instanceof ObstacleError) {
                //console.log("Aj va fan! - Turning right!")
                guard2.rotate()
            } else {
                console.log("Going Home")
                return false;
            }
        }
    }
}
