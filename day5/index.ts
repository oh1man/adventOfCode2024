import {readFileToString} from "../utils/FileUtilities.ts";
import {quicksort} from "../utils/SortingUtilities.ts";


const input = await readFileToString("./day5/input.txt");
const split = input.trim().split("\n\n");
const orders = split[0].trim().split("\n");
const instructions = split[1].trim().split("\n");

const ordersMap = new Map<string, string[]>();
for (const order of orders) {
    const split = order.trim().split("|");
    const list = ordersMap.get(split[0]) ?? [];
    list.push(split[1]);
    ordersMap.set(split[0], list);
}

let part1 = 0;
function inOrder(instruction: string[]) {
    for (let i = 0; i < instruction.length; i++) {
        for (let j = i + 1; j < instruction.length; j++) {
            const first = instruction[i];
            const compare = instruction[j];
            if (!correctOrder(first, compare)) {
                return false;
            }
        }
    }
    return true;
}

function correctOrder(first: string, compare: string) {
    if ((ordersMap.get(first) ?? []).includes(compare)) {
        return true;
    }
    return !(ordersMap.get(compare) ?? []).includes(first);
}

let part2 = 0;
for (const instruction of instructions) {
    const split = instruction.trim().split(",");
    const length = split.length;
    const number = (length - 1) / 2;
    if (inOrder(split)) {
        part1 += Number(split[number]);
    } else {
        const sorted = quicksort(split, correctOrder);
        part2 += Number(sorted[number]);
    }
}

console.log("Day 5")
console.log("Part 1: " + part1);
console.log("Part 2: " + part2);