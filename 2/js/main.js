let codedCypher;

fetch("cypher.txt")
  .then((response) => response.text())
  .then((text) => (codedCypher = text))
  .then((codedCypher) => {
    let cypherArray = codedCypher.split("\r\n");
    let gameIndex = 1;
    let cypherObjects = [];
    cypherArray.forEach((cypher, index) => {
      let cypherObject = {
        gameIndex: gameIndex,
        rounds: cypherArray[index],
      };
      gameIndex++;
      cypherObjects.push(cypherObject);
    });
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds = cypherObject.rounds
        .replace("Game ", "")
        .replace(":", "");
      cypherObject.rounds = cypherObject.rounds.substring(1);
    });
    // Read through cypherObjects.rounds and if you reach a semi-colon, add a new line
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds = cypherObject.rounds.replace(/;/g, "\n");
    });
    // Make cypherObjects.rounds an array with each line as an element
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds = cypherObject.rounds.split("\n");
    });
    // Make each round an array the first word as the number element and the rest as the colour element
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds.forEach((round, index) => {
        cypherObject.rounds[index] = round.split(" ");
      });
    });
    // Remove the first element of each round array
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds.forEach((round, index) => {
        cypherObject.rounds[index].shift();
      });
    });
    // For each round, every odd element an element with the key of number and every even element an element with the key of colour
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds.forEach((round, index) => {
        cypherObject.rounds[index] = round.reduce((acc, curr, index) => {
          if (index % 2 === 0) {
            acc["number"] = curr;
          } else {
            acc["colour"] = curr;
          }
          return acc;
        }, {});
      });
    });
    // For each round, if the colour is "red" and the number is greater than 12, or the colour is "green" and the number is greater than 13, or the colour is "blue" and the number is greater than 14, remove the object from the cypherObjects array
    cypherObjects.forEach((cypherObject) => {
      cypherObject.rounds.forEach((round, index) => {
        if (
          (round.colour === "red" && round.number > 12) ||
          (round.colour === "green" && round.number > 13) ||
          (round.colour === "blue" && round.number > 14)
        ) {
          cypherObject["impossible"] = true;
        }
      });
    });
    cypherObjects.forEach((cypherObject, index) => {
      if (cypherObject.hasOwnProperty.call(cypherObject, "impossible")) {
        cypherObjects.splice(index, 1);
      }
    });
    let numsToAdd = [];
    cypherObjects.forEach((cypherObject) => {
      if (cypherObject.hasOwnProperty.call(cypherObject, "impossible")) {
        return;
      } else {
        numsToAdd.push(cypherObject.gameIndex);
      }
    });
    console.log(cypherObjects);
    console.log(numsToAdd);
    let sum = numsToAdd.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    console.log(sum);
  })
  .catch((e) => console.error(e));
