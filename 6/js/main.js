let raceDetails;
fetch("input.txt")
  .then((response) => response.text())
  .then((text) => (raceDetails = text))
  .then((raceDetails) => {
    raceDetails = raceDetails.split("\r\n");
    let races = [];
    let singleRaceTime = 0;
    let singleRaceDistance = 0;
    raceDetails.forEach((race, index) => {
      raceDetails[index] = race.match(/\d+/g);
    });
    for (let i = 0; i <= 3; i++) {
      races.push({
        time: raceDetails[0][i],
        distance: raceDetails[1][i],
      });
      if (raceDetails[0][i] != 0) {
        singleRaceTime += raceDetails[0][i];
      }
      if (raceDetails[1][i] != 0) {
        singleRaceDistance += raceDetails[1][i];
      }
    }
    console.log(raceDetails);
    console.log(races);
    console.log(singleRaceTime);
    console.log(singleRaceDistance);

    let winningRaces = [];

    let answer = 0;

    let singleWinningRaceTimes = [];

    for (let i = 0; i <= singleRaceTime; i++) {
      let distanceTravelled = 0;
      let distanceRecord = singleRaceDistance;
      if (i == 0 || i == singleRaceTime) {
        distanceTravelled = 0;
      } else {
        let remainingTime = Number(singleRaceTime) - Number(i);
        distanceTravelled = Number(i) * Number(remainingTime);
      }
      if (distanceTravelled > distanceRecord) {
        singleWinningRaceTimes.push({
          time: i,
          distance: distanceTravelled,
        });
      }
    }

    let singleAnswer = singleWinningRaceTimes.length;

    console.log(`Single winning races: ${singleAnswer}`);

    races.forEach((race) => {
      let raceTime = race.time;
      let distanceRecord = race.distance;
      let winningRaceTimes = [];
      for (let i = 0; i <= raceTime; i++) {
        // console.log(i);
        let distanceTravelled = 0;
        if (i == 0 || i == raceTime) {
          distanceTravelled = 0;
        } else {
          let remainingTime = Number(raceTime) - Number(i);
          distanceTravelled = Number(i) * Number(remainingTime);
        }
        if (distanceTravelled > distanceRecord) {
          winningRaceTimes.push({
            time: i,
            distance: distanceTravelled,
          });
        }
        // console.log(`Distance travelled: ${distanceTravelled}mm after ${i}ms`);
      }
      winningRaces.push(winningRaceTimes);
    });
    console.log(winningRaces);
    answer =
      Number(winningRaces[0].length) *
      Number(winningRaces[1].length) *
      Number(winningRaces[2].length) *
      Number(winningRaces[3].length) *
      console.log(`Final answer is: ${answer}`);
  })
  .catch((err) => console.log(err));
