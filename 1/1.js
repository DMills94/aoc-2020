const a = require("../fileReader");

const array = a.txtToArray("1.txt");

let num1 = 0, num2 = 0, num3 = 0;

for (let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
        for(let k = 0; k < array.length; k++) {
            if (i === j || i === k) continue;
            if ( +array[i] + +array[j] + +array[k] === 2020) {
                num1 = +array[i]
                num2 = +array[j]
                num3 = +array[k]
    
                break;
            }
        }

    }
}

console.log(num1, num2, num3)
console.log(num1 + num2 + num3)
console.log(num1*num2*num3)
