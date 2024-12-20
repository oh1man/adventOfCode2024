import {readFileToString} from "../utils/FileUtilities.ts";
import {setShowLogs, superLog} from "../utils/CommentUtilities.ts";

// Set logging
setShowLogs(false);

// Read file
const filePath = './day1/input.txt';
const inputString = await readFileToString(filePath);
superLog(inputString);

// ******* PART 1 *****
// Split the file intp lines
const split = inputString.split("\n");
superLog(split);

// Simple example of a for loop
const firstColumn = [];
const secondColumn = [];
const numberOfRows = split.length;
for(let i = 0; i < numberOfRows; i++) {
    const line = split[i].split(" ");
    const firstNumber = Number(line[0]);
    const secondNumber = Number(line[line.length - 1]);
    firstColumn.push(firstNumber);
    secondColumn.push(secondNumber);
}

const firstColumnSorted = firstColumn.sort();
const secondColumnSorted = secondColumn.sort();
superLog(firstColumnSorted);
superLog(secondColumnSorted);

let totalDiff = 0;
for (let i = 0; i < numberOfRows; i++) {
    totalDiff += Math.abs(firstColumnSorted[i] - secondColumnSorted[i]);
}

console.log("Total Diff: " + totalDiff);


// ******* PART 2 *****
let similarityScore = 0;
for (const firstNumber of firstColumn) {
    let multiplier = 0;
    for (const secondNumber of secondColumn) {
        if (firstNumber == secondNumber) {
            multiplier += 1;
        }
    }
    similarityScore += firstNumber * multiplier
}
console.log("Similarity score: " + similarityScore);


/**
 * LEARNINGS:
 *
 * In JS / TS there is 3 different for-loops:
 * - For => Regular C based for
 * - For-of => JS for-each loop, where we iterate over iterables.
 * - For-in => Iterates over all keys in a JSON (javascript object) - VERY POWERFUL!
 */
