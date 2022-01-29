people = [
  { name: "Wrestler Seeded1", team: "Team 1", seed: 1 },
  { name: "Wrestler Seeded2", team: "Team 2", seed: 2 },
  { name: "Wrestler Seeded3", team: "Team 3", seed: 3 },
  { name: "Wrestler Seeded4", team: "Team 4", seed: 4 },
  { name: "Wrestler Seeded5", team: "Team 5", seed: 5 },
  { name: "Wrestler Seeded6", team: "Team 6", seed: 6 },
  { name: "Wrestler Seeded7", team: "Team 7", seed: 7 },
  { name: "Wrestler Seeded8", team: "Team 8", seed: 8 },
  { name: "Wrestler Seeded9", team: "Team 9", seed: 9 },
  { name: "Wrestler Seeded10", team: "Team 10", seed: 10 },
  { name: "Wrestler Seeded11", team: "Team 11", seed: 11 },
  { name: "Wrestler Seeded12", team: "Team 12", seed: 12 },
  { name: "Wrestler Seeded13", team: "Team 13", seed: 13 },
  { name: "Wrestler Seeded14", team: "Team 14", seed: 14 },
  { name: "Wrestler Seeded15", team: "Team 15", seed: 15 },
  { name: "Wrestler Seeded16", team: "Team 16", seed: 16 },
  { name: "Wrestler Seeded17", team: "Team 17", seed: 17 },
  { name: "Wrestler Seeded18", team: "Team 18", seed: 18 },
  { name: "Wrestler Seeded19", team: "Team 19", seed: 19 },
  { name: "Wrestler Seeded20", team: "Team 20", seed: 20 },
  { name: "Wrestler Seeded21", team: "Team 21", seed: 21 },
  { name: "Wrestler Seeded22", team: "Team 22", seed: 22 },
  { name: "Wrestler Seeded23", team: "Team 23", seed: 23 },
  { name: "Wrestler Seeded24", team: "Team 24", seed: 24 },
  { name: "Wrestler Seeded25", team: "Team 25", seed: 25 },
  { name: "Wrestler Seeded26", team: "Team 26", seed: 26 },
  { name: "Wrestler Seeded27", team: "Team 27", seed: 27 },
  { name: "Wrestler Seeded28", team: "Team 28", seed: 28 },
  { name: "Wrestler Seeded29", team: "Team 29", seed: 29 },
  { name: "Wrestler Seeded30", team: "Team 30", seed: 30 },
  { name: "Wrestler Seeded31", team: "Team 31", seed: 31 },
  { name: "Wrestler Seeded32", team: "Team 32", seed: 32 },
];
let bigArray = [];
let binarySplitting = (peopleArray) => {
  let topArray = [];
  let botArray = [];

  for (x = 0; x < peopleArray.length; x++) {
    if (x % 4 === 0 || x % 4 === 3) {
      topArray.push(peopleArray[x]);
    } else {
      botArray.push(peopleArray[x]);
    }
  }

  if (botArray.length === 2) {
    bigArray.push(topArray);
    bigArray.push(botArray);

    return;
  } else {
    binarySplitting(topArray);
    binarySplitting(botArray);
  }
};
binarySplitting(people);
let bo2Array = [];
let newBiggestArray = [];

for (let a = 0; a < bigArray.length / 2; a++) {
  bo2Array.unshift(bigArray[a + bigArray.length / 2]);
}
for (let a = 0; a < bigArray.length / 2; a++) {
  newBiggestArray.push(bigArray[a]);
}
for (let a = 0; a < bigArray.length / 2; a++) {
  newBiggestArray.push(bo2Array[a]);
}

let extraNewBiggestArray = [];

for (let x = 0; x < newBiggestArray.length; x++) {
  extraNewBiggestArray.push(newBiggestArray[x][0]);

  extraNewBiggestArray.push(newBiggestArray[x][1]);
}

console.log(extraNewBiggestArray);

let makeSureOddSeedsAreOnTopFunction = (
  formattedArrayOfWrestlersTeamsAndSeeds
) => {
  for (x = 0; x < formattedArrayOfWrestlersTeamsAndSeeds.length; x++) {
    if (x % 2 === 0) {
      if (formattedArrayOfWrestlersTeamsAndSeeds[x].seed % 2 === 0) {
        let placeholder1 = formattedArrayOfWrestlersTeamsAndSeeds[x];
        let placeholder2 = formattedArrayOfWrestlersTeamsAndSeeds[x + 1];
        formattedArrayOfWrestlersTeamsAndSeeds[x] = placeholder2;
        formattedArrayOfWrestlersTeamsAndSeeds[x + 1] = placeholder1;
      }
    }
  }
};

console.log(makeSureOddSeedsAreOnTopFunction(extraNewBiggestArray));
