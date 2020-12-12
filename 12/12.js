const { txtToArray } = require("../fileReader");

const input = txtToArray("12.txt");

let x = 0,
	y = 0,
	facing = 90;

let compass = {
	0: "N",
	90: "E",
	180: "S",
	270: "W",
};

const repoShip = (act, val) => {
	if (["N", "S"].includes(act)) {
		y = act === "N" ? y + val : y - val;
	}
	if (["W", "E"].includes(act)) {
		x = act === "E" ? x + val : x - val;
	}
};

// Q1
const turnShip = (act, val) => {
	facing = act === "R" ? facing + val : facing - val;
	if (facing >= 360) facing -= 360;
	if (facing < 0) facing += 360;
};

const moveShip = val => {
	const currentDir = compass[facing];
	repoShip(currentDir, val);
};
input.forEach(instr => {
	const act = instr[0];
	const val = +instr.substring(1);

	if (["R", "L"].includes(act)) turnShip(act, val);
	else if (act === "F") moveShip(val);
	else repoShip(act, val);
});

console.log(`Q1: ${Math.abs(x) + Math.abs(y)}`);

// Q2
x = 0;
y = 0;
facing = 90;
let wayX = 10,
	wayY = 1;

const approachWaypoint = val => {
	const moveX = val * wayX;
    const moveY = val * wayY;
	repoShip("E", moveX);
    repoShip("N", moveY);
};

const rotateWaypoint = (act, val) => {
    const oriX = wayX, oriY = wayY;
    const directionMultiplier = act === "L" ? -1 : 1;
    
    wayX = oriY * directionMultiplier;
    wayY = -oriX * directionMultiplier;

    if ((val / 90) > 1) rotateWaypoint(act, val - 90);
}

const repoWaypoint = (act, val) => {
	if (["N", "S"].includes(act)) {
		wayY = act === "N" ? wayY + val : wayY - val;
	}
	if (["W", "E"].includes(act)) {
		wayX = act === "E" ? wayX + val : wayX - val;
	}
};

input.forEach(instr => {
	const act = instr[0];
	const val = +instr.substring(1);

	if (["R", "L"].includes(act)) rotateWaypoint(act, val);
	else if (act === "F") approachWaypoint(val);
    else repoWaypoint(act, val);
});

console.log(`Q2: ${Math.abs(x) + Math.abs(y)}`)