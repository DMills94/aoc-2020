const { txtToArray } = require("../fileReader");

const input = txtToArray("9.txt");

const findIfPossible = (arr, next) => {
    let matchedNext = false;
    for (let [index, num] of arr.entries()) {
        for (let i = index; i < arr.length; i++) {
            if (num === arr[i]) continue;
            if (+num + +arr[i] === +next) {
                return maxedNext = true;
            }
        }
    };

    return matchedNext;
}

// Q1
const queryLength = 25;
let invalidNum;

for (let i = 0; i < input.length - queryLength; i++) {
    const queryVal = input[i + queryLength];
    const isPossible = findIfPossible(input.slice(i, i + queryLength), queryVal);

    if (!isPossible) {
        invalidNum = queryVal;
        break;
    }
}

console.log(`Q1: ${invalidNum}`);

// Q2

const invalidIndex = input.indexOf(invalidNum);
const q2Input = input.slice(0, invalidIndex);
let min, max;

const calcSum = arr => arr.reduce((acc, cur) => +acc + +cur);

for (let i = 2; i < q2Input.length - 1; i++) {
    for (j = 0; j < q2Input.length - i - 1; j++) {
        const queryArr = q2Input.slice(j, j + i);
        const sum = calcSum(queryArr);
        if (sum === +invalidNum) {
            min = Math.min(...queryArr);
            max = Math.max(...queryArr);
        };
    };
}

console.log(`Q2: ${min + max}`);