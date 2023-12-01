function sumOfCalibrationValues(calibrationValues: string[]): number {
  return calibrationValues.reduce(
    (sum, calibrationValue) => sum + getCalibrationNumber(calibrationValue),
    0
  );
}

function getCalibrationNumber(calibrationValue: string): number {
  let [firstNumber, lastNumber] = [0, 0];

  for (let i = 0; i < calibrationValue.length; i++) {
    const subString = calibrationValue.substring(i);
    const digit = getDigit(subString);

    if (digit !== -1) {
      firstNumber = digit;
      break;
    }
  }

  for (let i = calibrationValue.length - 1; i >= 0; i--) {
    const subString = calibrationValue.substring(i);
    const digit = getDigit(subString);

    if (digit !== -1) {
      lastNumber = digit;
      break;
    }
  }

  return firstNumber * 10 + lastNumber;
}

function getDigit(input: string): number {
  const validDigit: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
  };

  return Object.keys(validDigit).reduce((value, key) => {
    return input.indexOf(key) === 0 ? validDigit[key] : value;
  }, -1);
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
