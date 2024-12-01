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

function getSumOfSimilarityScore(listOne: number[], listTwo: number[]): number {
  const listTwoRepitition = new Map<number, number>();

  listTwo.forEach((number) => {
    listTwoRepitition.set(number, (listTwoRepitition.get(number) || 0) + 1);
  });

  return listOne.reduce((sum, number) => {
    return sum + number * (listTwoRepitition.get(number) || 0);
  }, 0);
}

const input = getInput("2024/1/input.txt");
const { listOne, listTwo } = parseInput(input);
const result = getSumOfSimilarityScore(listOne, listTwo);
console.log(result);
