function getSumOfPriorities(inputs: [string, string, string][]): number {

    return inputs.reduce((sum, input) => {
        let characterMap = new Map<string, number>();
        updateCharacterMap(characterMap, input[0]);
        updateCharacterMap(characterMap, input[1]);
        updateCharacterMap(characterMap, input[2]);

        let allHave = "";
        characterMap.forEach((value: number, key: string) => {
            if(value == 3){
                allHave = key; 
            }
        });

        const valueIfLower = Number(allHave.charCodeAt(0) - 'a'.charCodeAt(0)) + 1;
        const valueIfUpper = Number(allHave.charCodeAt(0) - 'A'.charCodeAt(0) + 27);

        const value = (allHave.toUpperCase() == allHave) ? valueIfUpper : valueIfLower;
        return sum + value;

    }, 0);
}

function updateCharacterMap(characterMap: Map<string, number>, input: string){
    const hasUpdated = new Map<string, boolean>();

    for(let i=0 ; i<input.length ; i++){
        const character = input[i];

        const count = characterMap.get(character) ?? 0;

        if(!hasUpdated.get(character)) {
            characterMap.set(character,  count + 1);
            hasUpdated.set(character, true);
        }
    }
}


function parseInputs(file: string): [string, string, string][] {
  const fs = require("fs");

  const rucksacks = fs.readFileSync(file, "utf-8");

  const inputs = rucksacks.split(/\r?\n/);
  const groupsOfThree: [string, string, string][] = [];
  let group:string[] = [];

  inputs.map((input: string) => {
      if(group.length < 3) {
          group.push(input);
      }
      else {
          groupsOfThree.push(group as [string, string, string]);
          group = [input];
      }
  });

  return groupsOfThree;
}

console.log(getSumOfPriorities(parseInputs("input.txt")));
