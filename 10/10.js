const { txtToArray } = require("../filereader");

const input = txtToArray("10.txt");

// Q1
let jolt1diffs = 0,
	jolt3diffs = 0;

const sortedInput = input.map(string => +string).sort((a, b) => a - b);
sortedInput.unshift(0);
sortedInput.push(Math.max(...sortedInput) + 3);

for (i = 0; i < sortedInput.length - 1; i++) {
	const diff = sortedInput[i + 1] - sortedInput[i];
	diff === 1 ? jolt1diffs++ : jolt3diffs++;
}

console.log(`Q1: ${jolt1diffs * jolt3diffs}`);

// Q2
const findPaths = () => {
    const paths = {};
    const reverseInput = sortedInput.reverse();
    
	reverseInput.forEach(jolt => {
        const possibleJumps = reverseInput.filter(
            jump => {
                return jump > jolt && jump <= jolt + 3}
        );

        paths[jolt] = possibleJumps.map(jump => paths[jump]).reduce((acc, cur) => acc + cur, 0) || 1;
    })

    return paths[0];
};

console.log(`Q2: ${findPaths()}`);