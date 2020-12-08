const { txtToArray } = require("../fileReader");

const input = txtToArray("7.txt");

const MY_BAG = "shiny gold";
let bagRules = {};

input.forEach(line => {
	const [bag, rules] = line.split(" bags contain ");
	const splitRules = rules.split(", ");
	bagRules[bag] = { all: rules.split(", ") };
	for (let rule of splitRules) {
		let numChildBags = rule.match(/(\d+)/g);
		if (!numChildBags) continue;

		bagRules[bag].numChildBags = bagRules[bag].numChildBags
			? (bagRules[bag].numChildBags += +numChildBags[0])
			: +numChildBags[0];
	}
});

// Q1
const outerBags = new Set();

const findOuterBags = (currentMatches, queryBag) => {
	for (const [bag, rules] of Object.entries(bagRules)) {
		for (let rule of rules.all) {
			if (rule.includes(queryBag)) {
				outerBags.add(bag);
				findOuterBags(currentMatches, bag);
			}
		}
	}
};

findOuterBags(outerBags, MY_BAG);
console.log(outerBags.size);

// Q2
let numInnerBags = 0;
const countInnerBags = queryBag => {
	const { all, numChildBags } = bagRules[queryBag];
	if (numChildBags) {
		numInnerBags += numChildBags;
		for (let rule of all) {
			const [full, count, bag] = rule.match(/^(\d*) (\w*[\s\w]*) bag/i);

			for (let i = 0; i < count; i++) {
				countInnerBags(bag);
			}
		}
	}
};

countInnerBags(MY_BAG);
console.log(numInnerBags);