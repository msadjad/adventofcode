function getSumOfPriorities(inputs: string[]): number {
    return inputs.reduce((sum: number, input: string) => {
        if(input == ""){
            return sum;
        }
        const middle = (input.length)/2;
        const firstHalf = input.substring(0, middle);
        const secondHalf = input.substring(middle, input.length);

        let duplicate = "";
        for(let i = 0; i<firstHalf.length && duplicate == ""; i++){
            for(let j = 0; j<secondHalf.length && duplicate == ""; j++){
                if(firstHalf[i] === secondHalf[j]){
                    duplicate = firstHalf[i]; 
                    break;
                }
            }
        }

        const valueIfLower = Number(duplicate.charCodeAt(0) - 'a'.charCodeAt(0)) + 1;
        const valueIfUpper = Number(duplicate.charCodeAt(0) - 'A'.charCodeAt(0) + 27);

        const value = (duplicate.toUpperCase() == duplicate) ? valueIfUpper : valueIfLower;
        
        return sum + value;
    }, 0);
}

function parseInputs(file: string): string[] {
  const fs = require("fs");

  const rucksacks = fs.readFileSync(file, "utf-8");

  return rucksacks.split(/\r?\n/);
}

console.log(getSumOfPriorities(parseInputs("input.txt")));
