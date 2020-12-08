const { txtToArray } = require("../fileReader");

const array = txtToArray("3.txt");

const TREE = "#";
const maxLineLength = array[0].length;

const treesHit = (right, down) => {
  let trees = 0;
  let checkIndex = right;
  for (let i = 0 + down; i < array.length; i += down) {
    if (array[i][checkIndex] === TREE) trees++;
    checkIndex = checkIndex + right;
    if (checkIndex >= maxLineLength) checkIndex = checkIndex - maxLineLength;
  }

  return trees;
};

const a = [treesHit(1, 1),treesHit(3, 1),treesHit(5, 1),treesHit(7, 1),treesHit(1, 2)];
console.log(a.reduce((acc, cur) => acc * cur))
