function numberOfTailPositions(commands: [string, number][]): number {
    const positions = new Map<string, boolean>();

    let head: [number, number] = [4, 0];
    let tail: [number, number] = [4, 0];

    commands.forEach((command: [string, number]) => {
        for(let i=0; i<command[1] ; i++){
            if(command[0] == 'R') {
                head = [head[0], head[1] + 1];
                moveTail(head, tail, positions);
            }
            if(command[0] == 'L') {
                head = [head[0], head[1] - 1];
                moveTail(head, tail, positions);
            }
            if(command[0] == 'U') {
                head = [head[0] - 1, head[1]];
                moveTail(head, tail, positions);
            }
            if(command[0] == 'D') {
                head = [head[0] + 1, head[1]];
                moveTail(head, tail, positions);
            }
        }
    });

    return positions.size;
}

function moveTail(head: [number, number], tail: [number, number], positions: Map<string, boolean>) {
    if(Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
        if(head[0] == tail[0]){
            tail[1] = tail[1] + (head[1] - tail[1] > 0 ? 1 : -1);
        }
        else if(head[1] == tail[1]){
            tail[0] = tail[0] + (head[0] - tail[0] > 0 ? 1 : -1);
        }
        else if(Math.abs(head[0] - tail[0]) > 1){
            tail[1] = head[1];
            tail[0] = tail[0] + (head[0] - tail[0] > 0 ? 1 : -1);
        }
        else if(Math.abs(head[1] - tail[1]) > 1){
            tail[0] = head[0];
            tail[1] = tail[1] + (head[1] - tail[1] > 0 ? 1 : -1);
        }
    }
    positions.set(`${tail[0]},${tail[1]}`, true);
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

const movements = parseInputs("input.txt");
console.log(numberOfTailPositions(movements));

