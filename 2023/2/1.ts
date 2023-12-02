type Game = {
  gameNumber: number;
  maxRed: number;
  maxBlue: number;
  maxGreen: number;
};

function countPossibleGames(games: Game[]): number {
  return games.reduce(
    (possibleGames, game) =>
      possibleGames + (isGamePossible(game) ? game.gameNumber : 0),
    0
  );
}

function isGamePossible(game: Game): boolean {
  return game.maxBlue <= 14 && game.maxGreen <= 13 && game.maxRed <= 12;
}

function parseGame(gameInput: string): Game {
  const game: Game = { gameNumber: -1, maxBlue: 0, maxGreen: 0, maxRed: 0 };

  const gameStrings = gameInput.split(":");

  game.gameNumber = Number(gameStrings[0].substring(4))
  const diceSets = gameStrings[1].split(';');
  diceSets.forEach((diceSet) => {
    const dices = diceSet.split(',');
    dices.forEach((dice) => {
      const diceRoll = dice.split(' ');
      switch(diceRoll[2]) {
        case 'red':
          game.maxRed = Math.max(game.maxRed, Number(diceRoll[1]));
          break;
        case 'green':
          game.maxGreen = Math.max(game.maxGreen, Number(diceRoll[1]));
          break;
        case 'blue':
          game.maxBlue = Math.max(game.maxBlue, Number(diceRoll[1]));
          break;
      }
    })
  })

  return game;
}

function parseInputs(file: string): Game[] {
  const fs = require("fs");

  const cubeGamesDocument = fs.readFileSync(file, "utf-8");

  const cubeGames: string[] = [];

  const cubeGamesList = cubeGamesDocument.split(/\r?\n/);

  return cubeGamesList.map((gameInput: string) => {
    return parseGame(gameInput);
  });
}

console.log(countPossibleGames(parseInputs("input.txt")));
