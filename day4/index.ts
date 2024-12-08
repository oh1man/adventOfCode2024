import { createMatrix, readFileToString } from "../utils/FileUtilities.ts";
import { Horizontal, Scan2D, Vertical } from "./scanning.ts";

const input = await readFileToString("./day4/input.txt");
const matrix = createMatrix(input);

// Part 1
{
    const scanner = new Scan2D(matrix);
    let numberOfXmas = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const val = matrix[row][col];
            if (val !== "X") {
                continue;
            }
            for (const horizontal of Object.values(Horizontal)) {
                for (const vertical of Object.values(Vertical)) {
                    const [scan, _] = scanner.getOneDirectionalScan(
                        col,
                        row,
                        horizontal as Horizontal,
                        vertical as Vertical,
                        4,
                    );
                    if ("XMAS" === scan.join("")) {
                        numberOfXmas += 1;
                    }
                }
            }
        }
    }
    console.log(numberOfXmas);
}

// Part 2
{
    const scanner = new Scan2D(matrix);
    let numberOfXmas = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const val = matrix[row][col];
            if (val !== "A") {
                continue;
            }
            const [diag1, diag2] = scanner.getDiagonals(
                col,
                row,
                1,
            );
            if (isMas(diag1) && isMas(diag2)) {
                numberOfXmas++;
            }
        }
    }
    console.log(numberOfXmas);
}

function isMas(diag1: string[]): boolean{
    const word = diag1.join("");
    const reverse = diag1.reverse().join("");
    return  "MAS" == word || "MAS" === reverse;
}

/**
 * LEARNINGS:
 * To iterate over values of an object we can use the Object.values().
 * Same goes for its keys, by using Object.keys()
 * Also noted that for-loops seems to be quite slow.
 */