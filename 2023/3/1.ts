function sumEnginePartNumbers(engineSchematic: string[]): number {
  let sumOfEnginePartNumbers = 0;

  for (let row = 0; row < engineSchematic.length; row++) {
    for (let column = 0; column < engineSchematic[row].length; column++) {
      let [schematicNumber, newColumn] = getSchematicNumber(
        engineSchematic,
        row,
        column
      );

      if (
        schematicNumber != -1 &&
        isPartNumber(engineSchematic, row, column, newColumn)
      ) {
        sumOfEnginePartNumbers += schematicNumber;
      }

      column = newColumn;
    }
  }

  return sumOfEnginePartNumbers;
}

function getSchematicNumber(
  engineSchematic: string[],
  row: number,
  column: number
): [number, number] {
  if (!isDigit(engineSchematic[row][column])) {
    return [-1, column];
  }

  let schematicNumber = "";

  while (
    isDigit(engineSchematic[row][column]) &&
    column != engineSchematic[row].length
  ) {
    schematicNumber += engineSchematic[row][column];
    column++;
  }

  return [Number(schematicNumber), column];
}

function isPartNumber(
  engineSchematic: string[],
  row: number,
  start: number,
  end: number
): boolean {
  for (let i = start; i < end; i++) {
    if (hasAdjacentSymbol(engineSchematic, row, i)) {
      return true;
    }
  }

  return false;
}

function hasAdjacentSymbol(
  engineSchematic: string[],
  row: number,
  column: number
): boolean {
  const rowStart = Math.max(0, row - 1);
  const rowEnd = Math.min(row + 1, engineSchematic.length - 1);
  const columnStart = Math.max(0, column - 1);
  const columnEnd = Math.min(column + 1, engineSchematic[0].length - 1);

  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = columnStart; j <= columnEnd; j++) {
      if (isSymbol(engineSchematic[i][j])) {
        return true;
      }
    }
  }

  return false;
}

function isDigit(input: string) {
  return input >= "0" && input <= "9";
}

function isSymbol(input: string) {
  return input != "." && !isDigit(input);
}

function parseInputs(file: string): string[] {
  const fs = require("fs");

  const engineSchematic = fs.readFileSync(file, "utf-8");

  return engineSchematic.split(/\r?\n/);
}

console.log(sumEnginePartNumbers(parseInputs("input.txt")));
