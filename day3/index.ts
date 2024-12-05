import { readFileToString } from "../utils/FileUtilities.ts";

let input = await readFileToString("./day3/input.txt");

// ******** Part 1 ***********
const extractMuls = /mul\(\d{1,3},\d{1,3}\)/g;
const muls = input.match(extractMuls);
let total = 0;

function multiply(mul: any) {
    const numbers = mul.match(/\d{1,3}/g)!.map(Number);
    return numbers[0] * numbers[1];
}

for (const mul of muls!) {
    total += multiply(mul);
}
console.log("Total result: " + total.toFixed(2));

// ********** Part 2 **********
const extractMulsAndDos = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
let operations = input.match(extractMulsAndDos);
let part2 = 0;
let executeMultipliers = true;
for (const operation of operations!) {
    if (operation === "do()") {
        executeMultipliers = true;
    } else if (operation === "don't()") {
        executeMultipliers = false;
    } else {
        if (executeMultipliers) {
            part2 += multiply(operation);
        }
    }
}
console.log("Total value: " + part2);

/**
 * LEARNINGS
 * Regex is an actual value type in JS and TS,
 * Regex is very powerful to extract data out of a string.
 * The RegExp has its own operation which are nice, but strings in the same fashion has its own.
 * Here I have use RegExp to extract specific string sequences, string.match(<RegExp>)
 */