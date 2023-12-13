// Cards
/*
A = 13
K = 12
Q = 11
J = 10
T = 9
9 = 8
8 = 7
7 = 6
6 = 5
5 = 4
4 = 3
3 = 2
2 = 1
*/
// Hand Types
/**
 * Five of a kind: All cards have same label - +7
 * Four of a kind: Four cards have same label, 1 different - +6
 * Full house: Three cards have same label, two cards with same label different from three of the same - +5
 * Three of a kind: Three cards have the same label, remaining cards have unique labels - +4
 * Two pair: Two cards have the same label, another two cards share another label, remaining card is unique - +3
 * One pair: Two cards share a label, the rest have unique labels - +2
 * High card: All cards have unique labels
 */
/* 
    If two hands have the same type, iterate through the indexes of each hand until you find different types
    If the types are different, the hand with the higher type wins
*/
// Go through cards, add up their totals and push to hands array
/*
    Each hand begins as an array with the total string of all the cards in it
*/
/*
    Each hand then becomes an object with the following properties:
    hand {
        rank: [rank]
        bid: [bid]
    }
*/

let handsArray;

fetch("example.txt")
  .then((response) => response.text())
  .then((text) => (handsArray = text))
  .then((handsArray) => {
    getTotalWinnings(handsArray);
  })
  .catch((err) => console.log(err));

function getTotalWinnings(handsArray) {
  handsArray = handsArray.split("\r\n");
  let splitArray = [];
  handsArray.forEach((hand) => {
    splitArray.push(hand.split(/[ ,]+/));
  });
  handsArray = splitArray;
  console.log(handsArray);
  let cardVals = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1,
  };
  //   for (let cardVal in cardVals) {
  //     console.log(`${cardVal}: ${cardVals[cardVal]}`);
  //   }
  let handScores = [];
  handsArray.forEach((hand, index) => {
    let handScore = 0;
    let foundMatches = [];
    // console.log(hand.length);
    for (let i = 0; i < hand[0].length; i++) {
      //   console.log(hand[0][i]);
      for (let cardVal in cardVals) {
        if (hand[0][i] == cardVal) {
          handScore += cardVals[cardVal];
        }
      }
      console.log(hand[0]);
      let numMatches = `${hand[0]}`.split(hand[0][i]).length - 1;
      //   Five of a kind
      if (numMatches == 5) {
        handScore += 7;
        foundMatches.push({
          num: i,
          numsFound: numMatches,
        });
      }
      //   Four of a kind
      if (numMatches == 4) {
        handScore += 6;
        foundMatches.push({
          num: i,
          numsFound: numMatches,
        });
      }
      //   Three of a kind
      if (numMatches == 3 && !foundMatches.includes(i)) {
        // Full house check
        if (foundMatches.length == 0) {
          handScore += 4;
        }
        foundMatches.push({
          num: i,
          numsFound: numMatches,
        });
      }
      //   One pair
      if (numMatches == 2) {
        handScore += 2;
        foundMatches.push({
          num: i,
          numsFound: numMatches,
        });
        // Full house check
        for (let nums in foundMatches) {
          if (nums.numsFound == 3) {
            handScore += 5;
          }
        }
      }
    }
    console.log(`Score of this hand is ${handScore}`);
    handScores.push({
      handIndex: index + 1,
      score: handScore,
      bid: hand[1],
    });
  });
  let highestScore = Math.max(...handScores.map((o) => o.score));
  console.log(handScores);
  console.log(`Highest score is ${highestScore}`);

  let sortedScores = handScores.sort((a, b) =>
    a.score > b.score ? 1 : b.score > a.score ? -1 : 0
  );

  console.log(sortedScores);

  for (let scores in sortedScores) {
    sortedScores[scores].rank = Number(scores) + 1;
  }
}
