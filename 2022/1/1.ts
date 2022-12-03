function findMax(inputs: number[][]): number {
  let maximum = 0;

  inputs.forEach((elfCalories) => {
    const elfCalory = elfCalories.reduce(
      (elfCalory, calory) => (elfCalory += calory),
      0
    );
    maximum = Math.max(maximum, elfCalory);
  });

  return maximum;
}

function parseInputs(file: string): number[][] {
  const fs = require("fs");

  const allFileContents = fs.readFileSync(file, "utf-8");

  const elfCalories: number[][] = [[]];
  let elfNumber = 0;

  const splittedLines = allFileContents.split(/\r?\n/);

  splittedLines.forEach((line: string) => {
    if (line.length == 0) {
      elfNumber++;
      elfCalories.push([]);
      return;
    }

    elfCalories[elfNumber].push(Number(line));
  });

  return elfCalories;
}

console.log(findMax(parseInputs("input.txt")));
