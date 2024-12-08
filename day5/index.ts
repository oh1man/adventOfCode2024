import {createDivided, readFileToString} from "../utils/FileUtilities.ts";
import {quicksort} from "../utils/SortingUtilities.ts";

function inOrder(instruction: string[]) {
    for (let i = 0; i < instruction.length; i++) {
        for (let j = i + 1; j < instruction.length; j++) {
            const first = instruction[i];
            const compare = instruction[j];
            if (!isCorrectOrder(first, compare)) {
                return false;
            }
        }
    }
    return true;
}

function isCorrectOrder(first: string, compare: string) {
    if ((ordersMap.get(first) ?? []).includes(compare)) {
        return true;
    }
    return !(ordersMap.get(compare) ?? []).includes(first);
}

const input = await readFileToString("./day5/input.txt");
const [orders, instructions] = createDivided(input);

const ordersMap = new Map<string, string[]>();
for (const order of orders) {
    const split = order.trim().split("|");
    const list = ordersMap.get(split[0]) ?? [];
    list.push(split[1]);
    ordersMap.set(split[0], list);
}

let part1 = 0;
let part2 = 0;
for (const instruction of instructions) {
    const split = instruction.trim().split(",");
    const length = split.length;
    const number = (length - 1) / 2;
    if (inOrder(split)) {
        part1 += Number(split[number]);
    } else {
        const sorted = quicksort(split, isCorrectOrder);
        part2 += Number(sorted[number]);
    }
}

console.log("Day 5")
console.log("Part 1: " + part1);
console.log("Part 2: " + part2);

/**
 * LEARNINGS:
 * High-Order Functions -> Javascript has a generic function type, compared to Java which needs to define interfaces
 * to be able to use functions as parameters.
 * The function type is essentially (par1: type, ...) => returnType.
 * This is quite nice!
 */