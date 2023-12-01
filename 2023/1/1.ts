function sumOfCalibrationValues(calibrationValues: string[]): number {
  return calibrationValues.reduce(
    (sum, calibrationValue) => sum + getCalibrationNumber(calibrationValue),
    0
  );
}

function getCalibrationNumber(calibrationValue: string): number {
  let [firstNumber, lastNumber] = [0, 0];

  for (let i = 0; i < calibrationValue.length; i++) {
    if (isDigit(calibrationValue[i])) {
      firstNumber = Number(calibrationValue[i]);
      break;
    }
  }

  for(let i=calibrationValue.length - 1 ; i>=0 ; i--) {
    if (isDigit(calibrationValue[i])) {
      lastNumber = Number(calibrationValue[i])
      break;
    }
  }

  return firstNumber * 10 + lastNumber;
}

function isDigit(character: string): boolean {
  return character >= "0" && character <= "9";
}

function parseInputs(file: string): string[] {
  const fs = require("fs");

  const calibrationDocument = fs.readFileSync(file, "utf-8");

  const calibrationValues: string[] = [];

  const calibrationDocumentLines = calibrationDocument.split(/\r?\n/);

  calibrationDocumentLines.forEach((line: string) => {
    calibrationValues.push(line);
  });

  return calibrationValues;
}

console.log(sumOfCalibrationValues(parseInputs("input.txt")));
