type Card = { winningNumbers: number[]; cardNumbers: number[] };

function countCardValues(cards: Card[]): number {
  let value = 0;

  cards.forEach((card) => {
    const winningNumbers: Set<number> = new Set(card.winningNumbers);

    const count = card.cardNumbers.filter((cardNumber: number) =>
      winningNumbers.has(cardNumber)
    ).length;

    if (count > 0) {
      value += Math.pow(2, count - 1);
    }
  });

  return value;
}

function numberStringToArray(input: string): number[] {
  return input
    .split(" ")
    .map(Number)
    .filter((num) => num !== 0);
}

function parseInputs(file: string): Card[] {
  const fs = require("fs");

  const scratchCards = fs.readFileSync(file, "utf-8");

  const cards = scratchCards.split(/\r?\n/);

  return cards.map((card: string): Card => {
    const cardSections = card.split(":");
    const cardTypes = cardSections[1].split("|");

    return {
      winningNumbers: numberStringToArray(cardTypes[0]),
      cardNumbers: numberStringToArray(cardTypes[1]),
    } as Card;
  });
}

console.log(countCardValues(parseInputs("input.txt")));
