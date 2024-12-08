/**
 * Quicksort
 * @param arr Array to sort.
 * @param sortingPredicate Predicate to apply for the sorting.
 */
export function quicksort<T>(
    arr: T[],
    sortingPredicate: (a: T, b: T) => boolean,
): T[] {
    // Base case: arrays with 0 or 1 elements are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Choose a pivot element (here, the last element)
    const pivot = arr[arr.length - 1];

    // Partition the array into two subarrays
    const left: T[] = []; // Elements less than the pivot
    const right: T[] = []; // Elements greater than the pivot

    for (let i = 0; i < arr.length - 1; i++) { // Exclude pivot
        if (sortingPredicate(arr[i], pivot)) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively sort the subarrays and concatenate them with the pivot
    return [...quicksort(left, sortingPredicate), pivot, ...quicksort(right, sortingPredicate)];
}