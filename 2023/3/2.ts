function sumGearRatios(engineSchematic: string[][]): number {
  let sumOfGearRatios = 0;

  for (let row = 0; row < engineSchematic.length; row++) {
    for (let column = 0; column < engineSchematic[row].length; column++) {
      sumOfGearRatios += getGearMultipliers(engineSchematic, row, column);
    }
  }

  return sumOfGearRatios;
}

function getGearMultipliers(
  engineSchematic: string[][],
  row: number,
  column: number
): number {
  if(engineSchematic[row][column] != '*') {
    return 0;
  }

  const rowStart = Math.max(0, row - 1);
  const rowEnd = Math.min(row + 1, engineSchematic.length - 1);
  const columnStart = Math.max(0, column - 1);
  const columnEnd = Math.min(column + 1, engineSchematic[0].length - 1);

  let numberOfAdjacentNumbers = 0;
  let gearRatio = 1;

  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = columnStart; j <= columnEnd; j++) {
      const schematicNumber = getSchematicNumber(engineSchematic, i, j);
      if (schematicNumber) {
        numberOfAdjacentNumbers += 1;
        gearRatio *= schematicNumber;
      }
    }
  }

  if(numberOfAdjacentNumbers == 2) {
    return gearRatio;
  }

  return 0;
}

function getSchematicNumber(
  engineSchematic: string[][],
  row: number,
  column: number
): number | undefined {
  if (!isDigit(engineSchematic[row][column])) {
    return undefined;
  }

  // Go to the beginning of the number
  while (column > 0 && isDigit(engineSchematic[row][column-1])) {
    column--;
  }

  let schematicNumber = "";

  while (
    isDigit(engineSchematic[row][column]) &&
    column != engineSchematic[row].length
  ) {
    schematicNumber += engineSchematic[row][column];
    engineSchematic[row][column] = '.'; // Removing processed numbers
    column++;
  }

  return Number(schematicNumber);
}

function isDigit(input: string) {
  return input >= "0" && input <= "9";
}

function parseInputs(file: string): string[][] {
  const fs = require("fs");

  const engineSchematic = fs.readFileSync(file, "utf-8");

  return engineSchematic.split(/\r?\n/).map((row: string) => row.split(''));
}

console.log(sumGearRatios(parseInputs("input.txt")));
