const { txtToArray } = require("../fileReader");

const input = txtToArray("11.txt");

const replaceStringValue = (string, i, r) => string.substring(0, i) + r + string.substring(i + 1);
const rowOccupiedSeats = seats => seats.filter(char => char === "#").length;
const countAllOccupiedSeats = input => {
	let occupied = 0;
	input.forEach(row => {
		occupied += rowOccupiedSeats(row.split(""));
	});

	return occupied;
};

const processSeatsQ1 = input => {
	let noChanges = true;
	const newInput = [...input];
	for (i = 0; i < input.length; i++) {
		for (j = 0; j < input[i].length; j++) {
			const char = input[i][j];
			if (char === ".") continue;
			else {
				const aboveRow = input[i - 1] ? input[i - 1].slice(j - 1 < 0 ? 0 : j - 1, j + 2) : [];
				const belowRow = input[i + 1] ? input[i + 1].slice(j - 1 < 0 ? 0 : j - 1, j + 2) : [];
				const adjacentSeats = [input[i][j - 1], input[i][j + 1], ...aboveRow, ...belowRow];
				const occupiedSeats = rowOccupiedSeats(adjacentSeats);

				if (occupiedSeats === 0 && char === "L") {
					newInput[i] = replaceStringValue(newInput[i], j, "#");
					noChanges = false;
				} else if (occupiedSeats >= 4 && char === "#") {
					newInput[i] = replaceStringValue(newInput[i], j, "L");
					noChanges = false;
				}
			}
		}
	}
	return noChanges ? countAllOccupiedSeats(newInput) : processSeatsQ1(newInput);
};

console.log(`Q1: ${processSeatsQ1(input)}`);

const findAdjacentSeats = (input, i, j) => {
	const seat = ["L", "#"];
	let n, ne, se, s, sw, nw;

	if (input[i - 1]) {
		let nwI = 1;
		do {
			const queryRow = input[i - nwI];
			if (!queryRow) break;
			const query = input[i - nwI][j - nwI];
			if (seat.includes(query)) nw = query;
			nwI++;
		} while (!nw);

		let nI = 1;
		do {
			const queryRow = input[i - nI];
			if (!queryRow) break;
			const query = input[i - nI][j];
			if (seat.includes(query)) n = query;
			nI++;
		} while (!n);
		let neI = 1;
		do {
			const queryRow = input[i - neI];
			if (!queryRow) break;
			const query = input[i - neI][j + neI];
			if (seat.includes(query)) ne = query;
			neI++;
		} while (!ne);
	}

	const currentRow = input[i];
	const w = j === 0 ? undefined : currentRow.substring(0, j).replace(/\./g, "").slice(-1);
	const e = currentRow.substring(j + 1).replace(/\./g, "")[0];

	if (input[i + 1]) {
		let swI = 1;
		do {
			const queryRow = input[i + swI];
			if (!queryRow) break;
			const query = input[i + swI][j - swI];
			if (seat.includes(query)) sw = query;
			swI++;
		} while (!sw);

		let sI = 1;
		do {
			const queryRow = input[i + sI];
			if (!queryRow) break;
			const query = input[i + sI][j];
			if (seat.includes(query)) s = query;
			sI++;
		} while (!s);
		let seI = 1;
		do {
			const queryRow = input[i + seI];
			if (!queryRow) break;
			const query = input[i + seI][j + seI];
			if (seat.includes(query)) se = query;
			seI++;
		} while (!se);
	}
	return [nw, n, ne, w, e, sw, s, se];
};

const processSeatsQ2 = input => {
	let noChanges = true;
	const newInput = [...input];
	for (i = 0; i < input.length; i++) {
		for (j = 0; j < input[i].length; j++) {
			const char = input[i][j];
			if (char === ".") continue;

			const adjacentSeats = findAdjacentSeats(input, i, j);
			const occupiedSeats = rowOccupiedSeats(adjacentSeats);

			if (occupiedSeats === 0 && char === "L") {
				newInput[i] = replaceStringValue(newInput[i], j, "#");
				noChanges = false;
			} else if (occupiedSeats >= 5 && char === "#") {
				newInput[i] = replaceStringValue(newInput[i], j, "L");
				noChanges = false;
			}
		}
	}

	return noChanges ? countAllOccupiedSeats(newInput) : processSeatsQ2(newInput);
};

console.log(`Q2: ${processSeatsQ2(input)}`);
