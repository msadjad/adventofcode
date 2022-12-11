function calculateSignalStrength(commands: [string, number][]) {
    let x = 1;
    let cycle=0;
    let value = 0;

    commands.forEach((command: [string, number]) => {
        cycle++;
        value = checkAndAddValue(value, cycle, x);
        if(command[0] == 'addx') {
            cycle++;
            value = checkAndAddValue(value, cycle, x);
            x += command[1];
        }
    });

    return value;
}

function checkAndAddValue(value: number, cycle: number, x: number): number {
    if([20, 60, 100, 140, 180, 220].includes(cycle)){
        value += (cycle * x); 
    }

    return value;
}

function parseInputs(file: string): [string, number][] {
    const fs = require("fs");

    const allFileContents = fs.readFileSync(file, "utf-8");

    const splittedLines = allFileContents.split(/\r?\n/);

    return splittedLines.reduce((commands: [string, number][], line: string) => {
        if(line != '') {
            const segments = line.split(' ');
            commands.push([segments[0], Number(segments[1])]);
        }
        return commands;
    }, [] as [string, number][]);
}

const commands = parseInputs("input.txt");
console.log(calculateSignalStrength(commands));

