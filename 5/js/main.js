let seedMaps;

fetch("example.txt")
  .then((response) => response.text())
  .then((text) => (seedMaps = text))
  .then((seedMaps) => {
    getClosestLoc(seedMaps);
  })
  .catch((err) => console.log(err));

function getClosestLoc(seedMaps) {
  seedMaps = seedMaps.split("\r\n");
  // Assign first line of seedMaps to seeds variable
  const seeds = seedMaps[0].split(":")[1].match(/\d+/g);
  // Then take the first line off the array
  seedMaps.splice(0, 1);
  // Remove empty array items
  seedMaps = seedMaps.filter((item) => item);

  // Partition maps
  let mapVals = [];
  mapVals.push(
    getMapVals(seedMaps, "seed-to-soil map:", "soil-to-fertilizer map:")
  );
  mapVals.push(
    getMapVals(seedMaps, "soil-to-fertilizer map:", "fertilizer-to-water map:")
  );
  mapVals.push(
    getMapVals(seedMaps, "fertilizer-to-water map:", "water-to-light map:")
  );
  mapVals.push(
    getMapVals(seedMaps, "water-to-light map:", "light-to-temperature map:")
  );
  mapVals.push(
    getMapVals(
      seedMaps,
      "light-to-temperature map:",
      "temperature-to-humidity map:"
    )
  );
  mapVals.push(
    getMapVals(
      seedMaps,
      "temperature-to-humidity map:",
      "humidity-to-location map:"
    )
  );
  mapVals.push(getMapVals(seedMaps, "humidity-to-location map:", ""));

  for (let i = 0; i <= seeds.length; i++) {
    if (seeds[i]) {
      console.log(seeds[i]);
      for (let n = 0; n < mapVals.length; n++) {
        if (mapVals[n]) {
          let seed = seeds[i];
          if (seed) {
            seed = getMapLocation(seed, mapVals[n]);
          }
        }
      }
    }
  }
}

function getMapVals(srcArr, minStr, maxStr) {
  let mapValsItem = [];
  let maxVal;
  if (maxStr) {
    maxVal = srcArr.indexOf(maxStr);
  } else {
    maxVal = srcArr.length;
  }
  for (let i = srcArr.indexOf(minStr); i < maxVal; i++) {
    let mapVal = srcArr[i].match(/\d+/g);
    if (mapVal != null) {
      mapVal = {
        dRange: mapVal[0],
        sRange: mapVal[1],
        rLen: mapVal[2],
      };
      mapValsItem.push(mapVal);
    }
  }
  return mapValsItem;
}

function getRange(rangeMin, rangeMax) {
  let resultingRange = [];
  for (let i = rangeMin; i <= rangeMax; i++) {
    resultingRange.push(i);
  }
  return resultingRange;
}

function getMapLocation(seedNum, mapRange) {
  let mapLoc = 0;
  let mapLocSteps = [];
  for (item in mapRange) {
    let rangeObj = mapRange[item];
    // check if seedId is in the range created by sRange
    // If it is, check the index of that sRange item
    // and get the corresponding index of dRange

    seedNum = Number(seedNum);

    const dRangeMin = Number(rangeObj.dRange);
    const dRangeMax = Number(Number(rangeObj.dRange) + Number(rangeObj.rLen));

    const sRangeMin = Number(rangeObj.sRange);
    const sRangeMax = Number(Number(rangeObj.sRange) + Number(rangeObj.rLen));

    const dRange = getRange(dRangeMin, dRangeMax);
    const sRange = getRange(sRangeMin, sRangeMax);

    if (sRange.indexOf(seedNum) > 0) {
      let seedIndex = sRange.indexOf(seedNum);
      if (dRange[seedIndex]) {
        mapLocSteps.push(dRange[seedIndex]);
      }
      break;
    } else {
      mapLocSteps.push(seedNum);
    }
  }
  mapLoc = mapLocSteps.at(-1);
  return mapLoc;
}
