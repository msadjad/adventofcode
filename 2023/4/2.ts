type Card = { winningNumbers: number[]; cardNumbers: number[] };

function countCards(cards: Card[]): number {
  let cardCounts: number[] = cards.map(() => 1);

  cards.forEach((card: Card, index: number) => {
    const winningNumbers: Set<number> = new Set(card.winningNumbers);

    const count = card.cardNumbers.filter((cardNumber: number) =>
      winningNumbers.has(cardNumber)
    ).length;

    for (let i = 0; i < count; i++) {
      cardCounts[index + i + 1] += cardCounts[index];
    }
  });

  return cardCounts.reduce((carry, value) => (carry += value), 0);
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

console.log(countCards(parseInputs("input.txt")));
