const { txtToArray } = require("../fileReader");

const input = txtToArray("6.txt");

// Q1
let uniqueQuestions = 0,
	groupUnique = {};

// Q2
let commonYes = 0,
	people = 0,
	groupYes = {};

input.forEach(line => {
	if (line === "") {
		// Q1
		uniqueQuestions += Object.keys(groupUnique).length;
		groupUnique = {};

		// Q2
		Object.values(groupYes).forEach(q => {
			if (q === people) commonYes++;
		});
		groupYes = {}, people = 0;
	} else {
		line.split("").forEach(char => {
			groupUnique[char] = 1;
			groupYes[char] ? groupYes[char]++ : (groupYes[char] = 1);
		});
		people++;
	}
});

console.log(uniqueQuestions);
console.log(commonYes);