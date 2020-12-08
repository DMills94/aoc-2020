const a = require("../fileReader");

const data = a.txtToArray("2.txt");

let validPasswordsQ1 = 0, validPasswordsQ2 = 0;;

data.forEach((line) => {
  let [count, letter, password] = line.split(" ");
  letter = letter.slice(0, -1);
  const [min, max] = count.split("-");
  const numLetterInPassword = password.replace(new RegExp(`[^${letter}]`, "gi"), "").length;
  if (numLetterInPassword <= max && numLetterInPassword >= min) validPasswordsQ1++;
});

data.forEach((line) => {
  let [numbers, letter, password] = line.split(" ");
  letter = letter.slice(0, -1);
  const [index1, index2] = numbers.split("-");
  if (
    (password[+index1 - 1] === letter && password[+index2 - 1] !== letter) ||
    (password[+index1 - 1] !== letter && password[+index2 - 1] === letter)
  )
    validPasswordsQ2++;
});

console.log(validPasswordsQ1);
console.log(validPasswordsQ2);