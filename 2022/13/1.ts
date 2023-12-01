type packetList = Array<number | number[] | packetList>;

function parseInputs(file: string): [packetList, packetList][] {
    const fs = require("fs");

    const allFileContents = fs.readFileSync(file, "utf-8");

    const splittedLines = allFileContents.split(/\r?\n/);

    const convertedLists: packetList[] = splittedLines.filter((line: string) => line != "").map((line: string) => parseLine(line));

    const parsedInput: [packetList, packetList][] = [];

    let first: packetList = [];
    let second: packetList = [];

    for(let i=0 ; i<convertedLists.length ; i++){
        if(i%2 == 0) {
            first = convertedLists[i];
        }
        else {
            second = convertedLists[i];
            parsedInput.push([first, second]);
        }
    }

    return parsedInput;
}

function parseLine(line: string): packetList {
    const stack: (string|number|packetList)[] = []; 

    let num = "";
    for(let i=0 ; i<line.length ; i++) {
        if(line[i] == '[') {
            stack.push(line[i]);
        }
        else if(line[i] == ']') {
            if(num != "") {
                stack.push(Number(num));
                num = "";
            }

            const list: packetList = [];
            let top = stack[stack.length - 1];
            stack.pop();

            while(top != '[') {
                list.push(top);
                top = stack[stack.length - 1];
                stack.pop();
            }
            
            stack.push(list.reverse());
        }
        else if(line[i] == ',') {
            stack.push(Number(num));
            num = "";
        }
        else {
            num += line[i];
        }
    }
   
    console.log(stack[0]);
    return stack[0];
}

const lists = parseInputs("input-mini.txt");
console.log();

