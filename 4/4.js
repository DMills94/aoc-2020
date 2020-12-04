const { txtToArray } = require("../fileReader");

const input = txtToArray("4.txt");

let validPassportsQ1 = 0;
let fullString = "";
const REQUIRED_PROPS_Q1 = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

input.forEach((line) => {
  if (line === "") {
    let validProps = 0;
    REQUIRED_PROPS_Q1.forEach((prop) => {
      if (fullString.includes(prop)) validProps++;
    });
    if (validProps === REQUIRED_PROPS_Q1.length) validPassportsQ1++;
    return (fullString = "");
  }
  fullString += ` ${line}`;
});

console.log(validPassportsQ1);

let validPassportsQ2 = 0;

const REQUIRED_PROPS_Q2 = [
  /byr:(200[0-2]|19[2-9][\d])$/gi,
  /iyr:(202[0]|201[\d])$/gi,
  /eyr:(202[\d]|2030)$/gi,
  /hgt:((1[5-8][\d]|19[0-3])cm|(59|6[\d]|7[0-6])in)$/gi,
  /hcl:#[\da-f]{6}$/gi,
  /ecl:(amb|blu|brn|gry|grn|hzl|oth)$/gi,
  /pid:[\d]{9}$/gi,
];

input.forEach((line) => {
  if (line === "") {
    let validProps = 0;
    fullString.split(" ").forEach((property) => {
      REQUIRED_PROPS_Q2.forEach((regex) => {
        if (property.match(regex)) validProps++;
      });
    });
    if (validProps === REQUIRED_PROPS_Q2.length) validPassportsQ2++;
    return (fullString = "");
  }
  fullString += ` ${line}`;
});

console.log(validPassportsQ2);
