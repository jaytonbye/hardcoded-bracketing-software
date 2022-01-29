let numberOfCompetitors = 8;
let numberOfMatches = numberOfCompetitors - 1;
let matchesArray = [];
let numberOfRounds = Math.log2(numberOfCompetitors);

let competitorsArray = [1, 2];
let finalCompetitorsArray = [];

// let competitorsArray = [1, 2, 3, 4, 5];
//competitorsArray.splice(2, 0, "Is");
// returns: [ 1, 2, 'Is', 3, 4, 5 ]

for (let x = 1; x <= numberOfRounds; x++) {
  console.log({ x });
  let sumOfEachMatchupForThisRound = Math.pow(2, x + 1) + 1;
  console.log({ sumOfEachMatchupForThisRound });
  let currentLength = competitorsArray.length;
  console.log({ currentLength });
  for (let y = 0; y < currentLength; y++) {
    console.log({ y });
    if (y % 2 === 0) {
      competitorsArray.splice(
        y + 1,
        0,
        sumOfEachMatchupForThisRound - competitorsArray[y]
      );
      console.log({ competitorsArray });
    }

    if (y % 2 === 1) {
      competitorsArray.splice(
        y + 1,
        0,
        sumOfEachMatchupForThisRound - competitorsArray[y + 1]
      );
      console.log({ competitorsArray });
    }
  }
}

console.log(competitorsArray);
