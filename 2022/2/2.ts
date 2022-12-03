function getScore(inputs: string[]): number {
    const scores: Map<string, number> = new Map<string, number>;
    scores.set("A X", 3);
    scores.set("A Y", 4);
    scores.set("A Z", 8);
    scores.set("B X", 1);
    scores.set("B Y", 5);
    scores.set("B Z", 9);
    scores.set("C X", 2);
    scores.set("C Y", 6);
    scores.set("C Z", 7);

    return inputs.reduce((score: number, input: string) => {
        score += Number(scores.get(input.toUpperCase()))
        //console.log(Number(scores.get(input.toUpperCase())))
        return score;
    }, 0);
}

function parseInputs(file: string): string[] {
  const fs = require("fs");

  const allFileContents = fs.readFileSync(file, "utf-8");

  const rockPaperScissors: string[] = [];

  const splittedLines = allFileContents.split(/\r?\n/);

  return splittedLines.filter((line: string) => line.length > 0);
}

console.log(getScore(parseInputs("input.txt")))
