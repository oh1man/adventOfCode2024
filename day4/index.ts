import {createMatrix, readFileToString} from "../utils/FileUtilities.ts";
import {Direction, Scan2D} from "./scanning.ts";

function includes(arg0: string, scan: string[]) {
    const word = scan.join("");
    const drow = scan.reverse().join("");
    return arg0 === word || arg0 === drow
}

const input = await readFileToString("./day4/input.txt");
const matrix = createMatrix(input);

let setOfCoordinates = new Set<[][]>();
const scanner = new Scan2D(matrix);
for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
        for (const direction of Object.values(Direction)) {
            const [scan, coordinates] = scanner.getOneDimensionalScan(col, row, direction as Direction, 4);
            if (includes("XMAS", scan)) {
                setOfCoordinates.add(coordinates)
            }
        }
    }
}
console.log(setOfCoordinates.size);

