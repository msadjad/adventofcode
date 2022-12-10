type maxInDirections = {
    left: number,
    right: number,
    top: number,
    bottom: number,
};

function makeMaxInDirectionMatrix(trees: string[]): maxInDirections[][] {
    const maxInDirectionMatrix: maxInDirections[][] = [];

    for(let i=0 ; i<trees.length ; i++) {
        maxInDirectionMatrix.push([]);

        for(let j=0 ; j<trees[i].length ; j++) {
            maxInDirectionMatrix[i].push({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            });
        }
    }
    
    for(let i=0 ; i<trees.length ; i++){
        fillMaxInDirectionValue(maxInDirectionMatrix, trees, i, 'right');
        fillMaxInDirectionValue(maxInDirectionMatrix, trees, i, 'left');
    }
    for(let i=0 ; i<trees[0].length ; i++){
        fillMaxInDirectionValue(maxInDirectionMatrix, trees, i, 'top');
        fillMaxInDirectionValue(maxInDirectionMatrix, trees, i, 'bottom');
    }

    return maxInDirectionMatrix;
}

function fillMaxInDirectionValue(maxInDirectionMatrix: maxInDirections[][], trees: string[], index: number, directionTo: string): maxInDirections[][] {
    const maxHeight = maxInDirectionMatrix.length;
    const maxWidth = maxInDirectionMatrix[0].length;

    if(directionTo == 'right') {
        maxInDirectionMatrix[index][0].left = -1;
        for(let i=1 ; i<maxWidth ; i++) {
            maxInDirectionMatrix[index][i].left = Math.max(maxInDirectionMatrix[index][i-1].left, Number(trees[index][i-1]));
        }
    }
    
    if(directionTo == 'bottom') {
        maxInDirectionMatrix[0][index].top = -1;
        for(let i=1 ; i<maxHeight ; i++) {
            maxInDirectionMatrix[i][index].top = Math.max(maxInDirectionMatrix[i-1][index].top, Number(trees[i-1][index]));
        }
    }

    if(directionTo == 'left') {
        maxInDirectionMatrix[index][maxWidth - 1].right = -1;
        for(let i=maxWidth - 2 ; i >= 0; i--) {
            maxInDirectionMatrix[index][i].right = Math.max(maxInDirectionMatrix[index][i+1].right, Number(trees[index][i+1]));
        }
    }

    if(directionTo == 'top') {
        maxInDirectionMatrix[maxHeight - 1][index].bottom = -1;
        for(let i=maxHeight - 2 ; i >= 0; i--) {
            maxInDirectionMatrix[i][index].bottom = Math.max(maxInDirectionMatrix[i+1][index].bottom, Number(trees[i+1][index]));
        }
    }

    return maxInDirectionMatrix;
}

function countVisibleTrees(trees: string[], maxInDirectionMatrix: maxInDirections[][]): number {
    let count = 0;
    for(let i=0 ; i<trees.length ; i++) {
        for(let j=0 ; j<trees[i].length ; j++) {
            const treeSize = Number(trees[i][j]);
            if(treeSize > maxInDirectionMatrix[i][j].left ||
               treeSize > maxInDirectionMatrix[i][j].right ||
               treeSize > maxInDirectionMatrix[i][j].top ||
               treeSize > maxInDirectionMatrix[i][j].bottom){
                count++;
            }
        }
    }

    return count;
}


function parseInputs(file: string): string[] {
    const fs = require("fs");

    const allFileContents = fs.readFileSync(file, "utf-8");

    const splittedLines = allFileContents.split(/\r?\n/);

    return splittedLines.filter((line: string) => line.length > 0);
}

const trees = parseInputs("input.txt");
const maxInDirectionsMatrix = makeMaxInDirectionMatrix(trees);
console.log(countVisibleTrees(trees, maxInDirectionsMatrix));
