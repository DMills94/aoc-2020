const { txtToArray } = require("../fileReader");

const input = txtToArray("5.txt");

const PLANE_LENGTH = 127, PLANE_WIDTH = 7;

const calcSeatId = (row, column) => row * 8 + column;

const findNum = (string, upperBound) => {
	let min = 0, max = upperBound;

	for (let char of string) {
		if (["F", "L"].includes(char)) {
			max = Math.floor((max + min) / 2);
		}
		if (["B", "R"].includes(char)) {
			min = Math.ceil((max + min) / 2);
		}
	}

	return max;
};

const calcPassId = pass => {
	const row = pass.slice(0, 7), col = pass.slice(7);

	const rowNum = findNum(row, PLANE_LENGTH);
	const colNum = findNum(col, PLANE_WIDTH);

	return calcSeatId(rowNum, colNum);
};

// Q1
let maxId = 0;

input.forEach(pass => {
	const passId = calcPassId(pass);
	if (passId > maxId) maxId = passId;
});

console.log(maxId);

// Q2
const FULL_FLIGHT_MAX_ID = calcSeatId(PLANE_LENGTH, PLANE_WIDTH);
const ID_LIST = Array.from({ length: FULL_FLIGHT_MAX_ID }, (val, index) => index);

input.forEach(pass => {
	const passId = calcPassId(pass);
	ID_LIST[passId] = "TAKEN";
});

const yourSeatId = ID_LIST.filter(id => id !== "TAKEN")
	.filter((id, i, arr) => {
		return Math.abs(id - arr[i + 1]) !== 1 && Math.abs(id - arr[i - 1]) !== 1;
	})
	.pop();

console.log(yourSeatId);
