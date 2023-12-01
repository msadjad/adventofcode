function bfs(heightMap: string[]): number {
    let startI = -1, startJ = -1, endI = -1, endJ = -1; //= [-1, -1, -1, -1]

    const distances: number[][] = [];

    for(let i=0 ; i<heightMap.length ; i++){
        distances.push([]);
        for(let j=0 ; j<heightMap[i].length ; j++){
            if(heightMap[i][j] == 'S'){
                startI = i;
                startJ = j;
                heightMap[i] = heightMap[i].substring(0,j)+'a'+heightMap[i].substring(j+1);
            }
            if(heightMap[i][j] == 'E'){
                endI = i;
                endJ = j;
                heightMap[i] = heightMap[i].substring(0,j)+'z'+heightMap[i].substring(j+1);
            }
            distances[i].push(-1);
        }
        console.log(heightMap[i]);
    }
    
    const queue: [number, number][] = [];

    const neighbours: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    distances[startI][startJ] = 0;
    let [row, column] = [startI, startJ];

    while(distances[endI][endJ] == -1 && row != -1 && column != -1) {
        for(let i=0 ; i<neighbours.length ; i++) {
            const [neighbourI, neighbourJ] = [row + neighbours[i][0], column + neighbours[i][1]];
            
            console.log(`${neighbourI} ${neighbourJ}`);

            if(neighbourI >= 0 && neighbourI < distances.length &&
               neighbourJ >= 0 && neighbourJ < distances[0].length &&
               distances[neighbourI][neighbourJ] == -1 &&
               Math.abs(heightMap[row].charCodeAt(column) - heightMap[neighbourI].charCodeAt(neighbourJ)) <= 1) {
                distances[neighbourI][neighbourJ] = distances[row][column] + 1;
                queue.push([neighbourI, neighbourJ]);
            }
        }

        [row, column] = queue.shift() ?? [-1, -1];
    }
     
    return distances[endI][endJ];
}

function parseInputs(file: string): string[] {
    const fs = require("fs");

    const allFileContents = fs.readFileSync(file, "utf-8");

    const splittedLines = allFileContents.split(/\r?\n/);

    return splittedLines.filter((line: string) => {
        return (line != ''); 
    });
}

const heightMap = parseInputs("input-mini.txt");
console.log(bfs(heightMap));

