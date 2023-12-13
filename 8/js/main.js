// let netMap;

// fetch("./input.txt")
//   .then((response) => response.text())
//   .then((text) => (netMap = text))
//   .then((netMap) => {
//     getSteps(netMap);
//   })
//   .catch((err) => console.log(err));
const fs = require("fs");
const text = fs.readFileSync("input.txt", "utf8");
getSteps(text);
function getSteps(netMap) {
  netMap = netMap.split("\r\n");
  // Then take the first line off the array
  const sequence = netMap.splice(0, 1)[0];
  // Remove empty array items
  netMap = netMap.filter((item) => item);
  // console.log(netMap);

  const nodes = [];

  netMap.forEach((line) => {
    let directions = line.match(/\((.*?)\)/)[1];
    let dirArray = directions.split(",");
    dirArray.forEach((dir, index) => {
      dirArray[index] = dir.trimStart();
    });
    // console.log(dirArray);
    nodes.push({
      id: line.split("=")[0].trimEnd(),
      L: dirArray[0],
      R: dirArray[1],
    });
  });
  let i = 0;
  let dirCount = 0;

  let endPoint = nodes.find((obj) => obj.id === "ZZZ");
  let startPoint = nodes[0];

  let stepCounter = 0;

  let currentItem = startPoint;

  while (currentItem.id !== "ZZZ") {
    if (sequence[dirCount]) {
      currentItem = nodes.find(
        (obj) => obj.id === currentItem[sequence[dirCount]]
      );
    }
    console.log(`Current item id is ${currentItem.id}`);
    i++;
    dirCount++;
    stepCounter++;
    if (dirCount >= sequence.length) {
      dirCount = 0;
    }
    if (sequence[dirCount]) {
      console.log(sequence[dirCount]);
    }
    if (stepCounter >= 17873) {
      console.log(
        `dir: ${sequence[dirCount]} value: ${currentItem[sequence[dirCount]]}`
      );
      break;
    }
    console.log(stepCounter);
  }
  console.log(stepCounter);
}
