import {readFileToString} from "../utils/FileUtilities.ts";
import {calculateDiff} from "../utils/MathUtilities.ts";

const input = await readFileToString("./day2/input.txt");
const reports = input.trim().split("\n"); // NOTE: trim() otherwise i get one-of error

function getNumberOfSafeReports() {
    let numberOfSafeReports = 0;
    for (const report of reports) {
        const levels = report.split(" ");
        const deltaReport = [];
        for (let i = 0; i < levels.length - 1; i++) {
            const diff = calculateDiff(levels[i + 1], levels[i]);
            deltaReport.push(diff)
        }
        const allIsPositive = deltaReport.every(e => e > 0);
        const allIsNegative = deltaReport.every(e => e < 0);
        const safeRate = deltaReport.every(e => Math.abs(e) <= 3 && Math.abs(e) > 0);
        if ((allIsPositive || allIsNegative) && safeRate) {
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
    const deltaReport = [];
    for (let i = 0; i < levels.length - 1; i++) {
        const diff = calculateDiff(levels[i + 1], levels[i]);
        if (diff > 0 && isSafeRate(diff)) {
            deltaReport.push(1)
        } else if (diff < 0 && isSafeRate(diff)) {
            deltaReport.push(-1)
        } else {
            deltaReport.push(0)
        }
    }
    const positiveOk = deltaReport.filter(e => e == 1).length >= levels.length - 2;
    const negativeOk = deltaReport.filter(e => e == -1).length >= levels.length - 2;

    if (positiveOk || negativeOk) {
        numberOfSafeReports++;
    }
}
console.log("Number of safe reports: " + numberOfSafeReports);