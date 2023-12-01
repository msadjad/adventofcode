function count4Directions(trees: string[], row: number, column: number): number {
    let max = -1;
    let [top, left, right, bottom] = [0, 0, 0, 0];
    let current = 0;

    for(let i=row+1 ; i<trees.length ; i++) {
        current = Number(trees[i][column]);
        if(current > max) {
            console.log(`bottom: i: ${i}, j: ${column}, value: ${current}, count: ${bottom}`);
            max = current;
            bottom++;
        }
    }

    max = -1;
    for(let i=column+1 ; i<trees[0].length ; i++) {
        current = Number(trees[row][i]);
        if(current > max) {
            console.log(`right: i: ${i}, j: ${column}, value: ${current}, count: ${right}`);
            max = current;
            right++;
        }
    }

    max = -1;
    for(let i=row-1 ; i>=0; i--) {
        current = Number(trees[i][column]);
        if(current > max) {
            console.log(`top: i: ${i}, j: ${column}, value: ${current}, count: ${top}`);
            max = current;
            top++;
        }
    }

    max = -1;
    for(let i=column-1 ; i>=0 ; i--) {
        current = Number(trees[row][i]);
        if(current > max) {
            console.log(`left: i: ${i}, j: ${column}, value: ${current}, count: ${left}`);
            max = current;
            left++;
        }
    }

    return left * right * top * bottom;
}

function countVisibleTrees(trees: string[]): number {
    let max = -1;
    for(let i=0 ; i<trees.length ; i++) {
        for(let j=0 ; j<trees[i].length ; j++) {
            max = Math.max(max, count4Directions(trees, i, j));
        }
    }

    return max;
}


function parseInputs(file: string): string[] {
    const fs = require("fs");

    const allFileContents = fs.readFileSync(file, "utf-8");

    const splittedLines = allFileContents.split(/\r?\n/);

    return splittedLines.filter((line: string) => line.length > 0);
}

const trees = parseInputs("input-mini.txt");
console.log(countVisibleTrees(trees));
