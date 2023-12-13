let gameRounds;

fetch("cypher.txt")
  .then((response) => response.text())
  .then((text) => (gameRounds = text))
  .then((gameRounds) => {
    gameRounds = gameRounds.split("\r\n");
    getGameRoundsSum(gameRounds);
  })
  .catch((err) => console.log(err));

// let gameRounds = [
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//   "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//   "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//   "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
// ];

function getGameRoundsSum(gameRounds) {
  let roundsArray = [];

  gameRounds.forEach((gameRound) => {
    gameRound = gameRound.split(":")[1];
    roundsArray.push(gameRound);
  });

  let gameIndex = 1;
  let roundObjects = [];
  roundsArray.forEach((counter) => {
    if (counter) {
      let round = {
        gameIndex: gameIndex,
        rounds: counter,
      };
      gameIndex++;
      roundObjects.push(round);
    }
  });

  roundObjects.forEach((roundObject) => {
    let compiledRounds = [];
    if (roundObject.rounds.length > 0) {
      let splitRounds = roundObject.rounds.split(/;/g);
      roundObject.rounds = splitRounds;
      roundObject.rounds.forEach((round, index) => {
        roundObject.rounds[index] = round.split(/,/g);
        roundObject.rounds[index].forEach((round) => {
          let roundNumber;
          let roundColour;
          if (round.match(/\d+/g)) {
            roundNumber = round.match(/\d+/g)[0];
          }
          if (round.match(/[a-z]+/g)) {
            roundColour = round.match(/[a-z]+/g)[0];
          }
          if (roundNumber && roundColour) {
            round = {
              number: roundNumber,
              colour: roundColour,
              originalText: roundObject.rounds[index],
            };
            compiledRounds.push(round);
          }
        });
      });
      roundObject.rounds = compiledRounds;
      roundObject.rounds.forEach((round) => {
        let totalRed = roundObject.rounds.reduce((acc, curr) => {
          if (curr.colour === "red") {
            return acc + parseInt(curr.number);
          } else {
            return acc;
          }
        }, 0);
        let totalGreen = roundObject.rounds.reduce((acc, curr) => {
          if (curr.colour === "green") {
            return acc + parseInt(curr.number);
          } else {
            return acc;
          }
        }, 0);
        let totalBlue = roundObject.rounds.reduce((acc, curr) => {
          if (curr.colour === "blue") {
            return acc + parseInt(curr.number);
          } else {
            return acc;
          }
        }, 0);
        if (
          (round.colour === "red" && round.number >= 12) ||
          (round.colour === "green" && round.number >= 13) ||
          (round.colour === "blue" && round.number >= 14)
        ) {
          roundObject["impossible"] = true;
        }
      });
    }
  });
  console.log(roundObjects);

  let gameSum = 0;

  let possibleRounds = [];

  roundObjects.forEach((roundObject) => {
    //   let gameIndexesSum;
    // console.log(roundObject);
    if (roundObject.hasOwnProperty.call(roundObject, "impossible")) {
      return;
    } else {
      if (roundObject.rounds.length > 0) {
        possibleRounds.push(roundObject);
      }
    }
  });
  console.log(possibleRounds);
  // let possibleRoundsSum = possibleRounds.reduce((acc, curr) => {
  //   return acc + curr.gameIndex;
  // }, 0);
  // console.log(possibleRoundsSum);
}
