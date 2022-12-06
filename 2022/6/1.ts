function findSignalStart(input: string): number {
    const numberOfCharacters = 4;

    for(let i=0 ; i<input.length - (numberOfCharacters + 1) ; i++) {
        let areAllDifferent = true;
        for(let j=0 ; j<numberOfCharacters ; j++) {
            for(let k = j+1 ; k<numberOfCharacters ; k++) {
                if(input[i+j] == input[i+k]){
                    areAllDifferent = false;
                }
            }
        }

        if(areAllDifferent) {
            return i + numberOfCharacters;
        }
    }

    return -1;
}

function parseInput(file: string): string {
    const fs = require("fs");
    const allFileContents = fs.readFileSync(file, "utf-8");

    return allFileContents;
}

console.log(findSignalStart("bvwbjplbgvbhsrlpgdmjqwftvncz"));
console.log(findSignalStart("nppdvjthqldpwncqszvftbrmjlhg"));
console.log(findSignalStart("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"));
console.log(findSignalStart("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));
console.log(findSignalStart(parseInput("input.txt")));
