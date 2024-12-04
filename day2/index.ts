import {readFileToString} from "../utils/FileUtilities.ts";
import {calculateDiff} from "../utils/MathUtilities.ts";

const input = await readFileToString("./day2/input.txt");
const reports = input.trim().split("\n"); // NOTE: trim() otherwise i get one-of error

function isSafeLevel(levels: string[]) {
    const deltaReport = [];
    for (let i = 0; i < levels.length - 1; i++) {
        const diff = calculateDiff(levels[i + 1], levels[i]);
        deltaReport.push(diff)
    }
    const allIsPositive = deltaReport.every(e => e > 0);
    const allIsNegative = deltaReport.every(e => e < 0);
    const safeRate = deltaReport.every(e => Math.abs(e) <= 3 && Math.abs(e) > 0);
    return (allIsPositive || allIsNegative) && safeRate;
}

function getNumberOfSafeReports() {
    let numberOfSafeReports = 0;
    for (const report of reports) {
        const levels = report.split(" ");
        if (isSafeLevel(levels)) {
            numberOfSafeReports++;
        }
    }
    return numberOfSafeReports;
}

console.log("Number of safe reports: " + getNumberOfSafeReports());

/**
 * LEARNINGS:
 * trim() is good to do when reading a file to not get any strange lines in the end.
 */

let numberOfSafeReports = 0;

function isSafeRate(diff: number) {
    return Math.abs(diff) <= 3 && Math.abs(diff) > 0;
}

for (const report of reports) {
    const levels = report.split(" ");
    if (isSafeLevel(levels)) {
        numberOfSafeReports++;
        continue;
    }
    for (let i = 0; i < levels.length; i++) {
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeLevel(modifiedLevels)) {
            numberOfSafeReports++;
            break;
        }
    }
}
console.log("Number of safe reports: " + numberOfSafeReports);

/**
 * LEARNING
 * To copy a collection we can use the special "..." - operator known as spreading operator.
 * For example [...array] => [...[1, 2, 3]] => [1, 2, 3] which is a new instance and a copy of the first one
 */