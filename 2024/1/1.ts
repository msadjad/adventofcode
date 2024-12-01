function getInput(file: string): string[] {
  const fs = require("fs");

  const document = fs.readFileSync(file, "utf-8");

  return document.split(/\r?\n/);
}

function parseInput(document: string[]): {
  listOne: number[];
  listTwo: number[];
} {
  const [listOne, listTwo]: [number[], number[]] = [[], []];

  document.forEach((line) => {
    const [firstNumber, secondNumber] = line.split("   ").map(Number);

    listOne.push(firstNumber);
    listTwo.push(secondNumber);
  });

  return { listOne, listTwo };
}

function getSumOfDistances(listOne: number[], listTwo: number[]): number {
  listOne.sort((a, b) => a - b);
  listTwo.sort((a, b) => a - b);

  return listOne.reduce((sum, number, index) => {
    sum += Math.abs(listTwo[index] - number);
    return sum;
  }, 0);
}

const input = getInput("2024/1/input.txt");
const { listOne, listTwo } = parseInput(input);
const result = getSumOfDistances(listOne, listTwo);
console.log(result);
