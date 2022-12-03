function findTop3Max(inputs: number[][]): number {
  let totals: number[] = [];

  inputs.forEach((elfCalories) => {
    const elfCalory: number = elfCalories.reduce(
      (elfCalory, calory) => (elfCalory += calory),
      0
    );

    totals.push(elfCalory);
  });

  totals = totals.sort((n1,n2) => n1 - n2).reverse();

  let max3Calories = 0;

  for (let i = 0; i < Math.min(3, totals.length); i++) {
    max3Calories += totals[i];
  }

  return max3Calories;
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

console.log(findTop3Max(parseInputs("input.txt")));
