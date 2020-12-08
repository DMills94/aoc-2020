const { txtToArray } = require("../fileReader");

const input = txtToArray("8.txt");

const calcAcc = arr => {
    let acc = 0;
    let loopFound = false;
    let index = 0;
    const set = new Set([index]);

    do {
        const [all, instruction, amount] = arr[index].match(/(.+) (.+)/);
        switch (instruction) {
            case "nop":
                index++;
                break;
    
            case "acc":
                index++;
                acc += +amount;
                break;
                
            case "jmp":
                index += +amount
                break;
    
            default:
                break;
        }

        // Hacky way to tell if the program terminates
        if (!arr[index]) return { acc };

        if (set.has(index)) {
            loopFound = true;
            return { acc, index };
        }
        else set.add(index);
    } while (!loopFound);
}

// Q1
console.log(`Q1: ${calcAcc(input).acc}`);

// Q2
let finalAcc;
input.forEach((instr, i) => {
    if (["nop", "jmp"].some(func => instr.includes(func))) {
        let testInput = [ ...input];
        testInput[i] = instr.replace(/(?:jmp|nop)/g, match => match === "jmp" ? "nop" : "jmp");
        const { acc, index } = calcAcc(testInput);
        if (!index) return finalAcc = acc;
    }
})

console.log(`Q2: ${finalAcc}`)
