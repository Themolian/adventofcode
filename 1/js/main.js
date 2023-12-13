let codedCypher;

fetch("cypher.txt")
  .then((response) => response.text())
  .then((text) => (codedCypher = text))
  .then((codedCypher) => {
    let finalSum = getSumOfNums(codedCypher);
    console.log(finalSum);
  })
  .catch((e) => console.error(e));

function getSumOfNums(codedCypher) {
  let cypherLines = codedCypher.split("\r\n");
  let numbersArray = [];
  cypherLines.forEach((string) => {
    let numbers = string.match(/\d+/g).map(Number);
    numbersArray.push(numbers);
  });

  let numsToAdd = [];

  numbersArray.forEach((numbers) => {
    let firstNumber = String(numbers[0]).charAt(0);
    let lastNumber = String(numbers.at(-1)).charAt(0);
    numsToAdd.push(Number("" + firstNumber + lastNumber));
  });

  // return numsToAdd;

  let answer = 0;

  numsToAdd.forEach((num) => {
    answer += num;
  });

  return answer;
}
