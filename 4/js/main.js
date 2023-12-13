let scratchCards;

fetch("input.txt")
  .then((response) => response.text())
  .then((text) => (scratchCards = text))
  .then((scratchCards) => {
    scratchCards = scratchCards.split("\r\n");
    getValueOfCards(scratchCards);
  })
  .catch((err) => console.log(err));

function getValueOfCards(scratchCards) {
  let cardsArray = [];

  scratchCards.forEach((scratchCard) => {
    scratchCard = scratchCard.split(":")[1];
    cardsArray.push(scratchCard);
  });

  let finalPoints = 0;
  let cardIndex = 1;

  cardsArray.forEach((card, index) => {
    if (card) {
      card = {
        cardNumber: cardIndex,
        winners: card.split("|")[0].match(/\d+/g),
        numbers: card.split("|")[1].match(/\d+/g),
        matches: 0,
        points: 0,
        copies: 1,
        wonCardIndexes: [],
      };
      cardIndex++;
      cardsArray[index] = card;
      let numberMatches = [];
      let pointValue = 0;
      card.numbers.forEach((cardNumber) => {
        card.winners.forEach((winnerNumber) => {
          if (cardNumber === winnerNumber) {
            card.matches++;
            if (pointValue > 0) {
              pointValue = pointValue *= 2;
            } else {
              pointValue = 1;
            }
          }
        });
      });
      card.points = pointValue;
      finalPoints += card.points;
    }
  });
  cardsArray.forEach((card) => {
    if (card) {
      if (card.matches > 0) {
        for (let i = 0; i < card.copies; i++) {
          for (let n = 0; n < card.matches; n++) {
            let targetCardNumber = card.cardNumber + 1 + n;
            let cardCopy = cardsArray.find(
              (foundCard) => foundCard.cardNumber == targetCardNumber
            );
            cardCopy.copies += 1;
          }
        }
      }
    }
  });
  console.log(cardsArray);
  let totalCards = 0;
  cardsArray.forEach((card) => {
    if (card) {
      totalCards += card.copies;
    }
  });
  console.log(`There are ${totalCards} cards in total`);
}
