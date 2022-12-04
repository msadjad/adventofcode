function isContaining(first: [number, number], second: [number, number]): boolean {
    return (first[0] <= second[0] && first[1] >= second[1]) 
        || (first[0] >= second[0] && first[1] <= second[1]) 
        || (first[0] <= second[0] && first[1] >= second[0]) 
        || (first[0] >= second[0] && first[0] <= second[1]);
}

function parseInput(filename: string): string[]{
    const fs = require('fs');

    const cleaningPairs = fs.readFileSync(filename, "utf-8");

    return cleaningPairs.split(/\r?\n/);
}

const pairs = parseInput("input.txt");

console.log(pairs.reduce((count: number, pair: string) => {
    if(pair.length == 0){
        return count;
    }

    const sections = pair.split(','); 
    const firstPair = sections[0].split('-');
    const secondPair = sections[1].split('-');

    const first: [number, number] = [Number(firstPair[0]), Number(firstPair[1])];
    const second: [number, number] = [Number(secondPair[0]), Number(secondPair[1])];

    return count + (isContaining(first, second) ? 1 : 0);
}, 0));
