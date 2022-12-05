function processStacks(commands: [number, number, number][], stacks: string[][]): string{

    commands.forEach((command) => {
        for(let i = 0 ; i<command[0] ; i++){
            const top = stacks[command[1]-1].pop();
            if(top){
                stacks[command[2]-1].push(top);
            }
        }
    });

    let response = "";

    for(let i = 0 ; i<stacks.length ; i++){
        if(stacks[i].length > 0){
            response += stacks[i][stacks[i].length - 1];
        }
        else {
            response += " ";
        }
    }

    return response;
}

function parseInput(file: string): {stacks: string[][], commands: [number, number, number][]} {
    
    let stacks: string[][] = [];
    let commands: [number, number, number][] = [];

    const fs = require('fs');
    const allFileContents = fs.readFileSync(file, "utf-8");
    const splittedLines: string[] = allFileContents.split(/\r?\n/);
   
    const stackLines = splittedLines.reduce((carry: string[], line: string) => {
        if(line.length > 0 && line[0] != 'm'){
            carry.push(line);
        }

        return carry;
    }, [] as string[]);

    for(let i = stackLines.length - 2; i >= 0 ; i--) {
        const stackStrings = stackLines[i].match(/.{1,4}/g); 

        if(stackStrings == null) {
            break;
        }

        if(stacks.length == 0){
            for(let i=0 ; i<stackStrings.length ; i++){
                stacks.push([]);
            }
        }

        for(let i=0 ; i<stackStrings.length ; i++){
            if(stackStrings[i][1] != ' ') {
                stacks[i].push(stackStrings[i][1]);
            }
        }
    }

    commands = splittedLines.reduce((carry: [number, number, number][], line: string) => {
        if(line.length > 0 && line[0] == 'm'){
            const lineSections = line.split(' ');
            carry.push([Number(lineSections[1]), Number(lineSections[3]), Number(lineSections[5])]);
        }

        return carry;
    }, [] as [number, number, number][]);
    
    return {stacks, commands};
}

const processedInput = parseInput('input.txt');
console.log(processStacks(processedInput.commands, processedInput.stacks));
