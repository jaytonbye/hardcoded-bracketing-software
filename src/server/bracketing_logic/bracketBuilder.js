//The bracket builder

// This is the data formatter. It will start by taking a tab separated list (in order of seeding from first to last) and maninpulating it into an array of objects where each object contains the wrestler's name and team name.
let dataFormatter = (tabSeparatedWrestlersString) => {
  let arrayOfWrestlersAndTeamsTabSeparated = tabSeparatedWrestlersString.split(
    "\n"
  );

  let arrayOfWrestlersandTeams = [];
  for (let x = 0; x < arrayOfWrestlersAndTeamsTabSeparated.length; x++) {
    let indexOfSlashT = arrayOfWrestlersAndTeamsTabSeparated[x].search("\t");
    let name = arrayOfWrestlersAndTeamsTabSeparated[x].slice(0, indexOfSlashT);
    let team = arrayOfWrestlersAndTeamsTabSeparated[x].slice(indexOfSlashT + 1);

    arrayOfWrestlersandTeams.push({ name: name, team: team, seed: x + 1 });
  }

  return arrayOfWrestlersandTeams;
};

let formattedArrayOfWrestlersAndTeams = dataFormatter(`Wrestler Seeded1	Team 1
Wrestler Seeded2	Team 2
Wrestler Seeded3	Team 3
Wrestler Seeded4	Team 4
Wrestler Seeded5	Team 5
Wrestler Seeded6	Team 6
Wrestler Seeded7	Team 7
Wrestler Seeded8	Team 8
Wrestler Seeded9	Team 9
Wrestler Seeded10	Team 10
Wrestler Seeded11	Team 11
Wrestler Seeded12	Team 12
Wrestler Seeded13	Team 13
Wrestler Seeded14	Team 14
Wrestler Seeded15	Team 15
Wrestler Seeded16	Team 16
Wrestler Seeded17	Team 17
Wrestler Seeded18	Team 18
Wrestler Seeded19	Team 19
Wrestler Seeded20	Team 20
Wrestler Seeded21	Team 21
Wrestler Seeded22	Team 22
Wrestler Seeded23	Team 23
Wrestler Seeded24	Team 24
Wrestler Seeded25	Team 25
Wrestler Seeded26	Team 26
Wrestler Seeded27	Team 27
Wrestler Seeded28	Team 28
Wrestler Seeded29	Team 29
Wrestler Seeded30	Team 30
Wrestler Seeded31	Team 31
Wrestler Seeded32	Team 32`);

console.log({ formattedArrayOfWrestlersAndTeams });

let handleSeedingFunction = (initialArrayOfCompetitorsOrderedBySeed) => {
  let bigArray = [];
  let binarySplitting = (initialArrayOfCompetitorsOrderedBySeed) => {
    let topArray = [];
    let botArray = [];

    for (x = 0; x < initialArrayOfCompetitorsOrderedBySeed.length; x++) {
      if (x % 4 === 0 || x % 4 === 3) {
        topArray.push(initialArrayOfCompetitorsOrderedBySeed[x]);
      } else {
        botArray.push(initialArrayOfCompetitorsOrderedBySeed[x]);
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
  binarySplitting(initialArrayOfCompetitorsOrderedBySeed);
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
    return formattedArrayOfWrestlersTeamsAndSeeds;
  };

  //console.log(makeSureOddSeedsAreOnTopFunction(extraNewBiggestArray));
  let Output = makeSureOddSeedsAreOnTopFunction(extraNewBiggestArray);
  return Output;
};

let seededArrayofWrestlersAndTeams = handleSeedingFunction(
  formattedArrayOfWrestlersAndTeams
);

// This is the bracket builder. It will start by taking a tab separated list (in order of seeding from first to last) and maninpulating it into an array of objects where each object contains the wrestler's name and team name (this function is called the dataFormatter)
let bracketBuilder = (formattedArrayOfWrestlersAndTeams) => {
  let empty32ManDoubleEliminationBracket = [
    {
      matchNumber: 1,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 2,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 3,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 4,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 5,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 6,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 7,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 8,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 9,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 10,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 11,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 12,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 13,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 14,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 15,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 16,
      topLineWrestler: "bye",
      bottomLineWrestler: "bye",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 17,
      topLineWrestler: "loserOfBout#1",
      bottomLineWrestler: "loserOfBout#2",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 18,
      topLineWrestler: "loserOfBout#3",
      bottomLineWrestler: "loserOfBout#4",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 19,
      topLineWrestler: "loserOfBout#5",
      bottomLineWrestler: "loserOfBout#6",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 20,
      topLineWrestler: "loserOfBout#7",
      bottomLineWrestler: "loserOfBout#8",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 21,
      topLineWrestler: "loserOfBout#9",
      bottomLineWrestler: "loserOfBout#10",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 22,
      topLineWrestler: "loserOfBout#11",
      bottomLineWrestler: "loserOfBout#12",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 23,
      topLineWrestler: "loserOfBout#13",
      bottomLineWrestler: "loserOfBout#14",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 24,
      topLineWrestler: "loserOfBout#15",
      bottomLineWrestler: "loserOfBout#16",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 25,
      topLineWrestler: "winnerOfBout#1",
      bottomLineWrestler: "winnerOfBout#2",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 26,
      topLineWrestler: "winnerOfBout#3",
      bottomLineWrestler: "winnerOfBout#4",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 27,
      topLineWrestler: "winnerOfBout#5",
      bottomLineWrestler: "winnerOfBout#6",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 28,
      topLineWrestler: "winnerOfBout#7",
      bottomLineWrestler: "winnerOfBout#8",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 29,
      topLineWrestler: "winnerOfBout#9",
      bottomLineWrestler: "winnerOfBout#10",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 30,
      topLineWrestler: "winnerOfBout#11",
      bottomLineWrestler: "winnerOfBout#12",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 31,
      topLineWrestler: "winnerOfBout#13",
      bottomLineWrestler: "winnerOfBout#14",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 32,
      topLineWrestler: "winnerOfBout#15",
      bottomLineWrestler: "winnerOfBout#16",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 33,
      topLineWrestler: "winnerOfBout#17",
      bottomLineWrestler: "loserOfBout#32",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 34,
      topLineWrestler: "winnerOfBout#18",
      bottomLineWrestler: "loserOfBout#31",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 35,
      topLineWrestler: "winnerOfBout#19",
      bottomLineWrestler: "loserOfBout#30",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 36,
      topLineWrestler: "winnerOfBout#20",
      bottomLineWrestler: "loserOfBout#29",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 37,
      topLineWrestler: "winnerOfBout#21",
      bottomLineWrestler: "loserOfBout#28",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 38,
      topLineWrestler: "winnerOfBout#22",
      bottomLineWrestler: "loserOfBout#27",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 39,
      topLineWrestler: "winnerOfBout#23",
      bottomLineWrestler: "loserOfBout#26",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 40,
      topLineWrestler: "winnerOfBout#24",
      bottomLineWrestler: "loserOfBout#25",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 41,
      topLineWrestler: "winnerOfBout#25",
      bottomLineWrestler: "winnerOfBout#26",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 42,
      topLineWrestler: "winnerOfBout#27",
      bottomLineWrestler: "winnerOfBout#28",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 43,
      topLineWrestler: "winnerOfBout#29",
      bottomLineWrestler: "winnerOfBout#30",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 44,
      topLineWrestler: "winnerOfBout#31",
      bottomLineWrestler: "winnerOfBout#32",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 45,
      topLineWrestler: "winnerOfBout#33",
      bottomLineWrestler: "winnerOfBout#34",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 46,
      topLineWrestler: "winnerOfBout#35",
      bottomLineWrestler: "winnerOfBout#36",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 47,
      topLineWrestler: "winnerOfBout#37",
      bottomLineWrestler: "winnerOfBout#38",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 48,
      topLineWrestler: "winnerOfBout#39",
      bottomLineWrestler: "winnerOfBout#40",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 49,
      topLineWrestler: "winnerOfBout#45",
      bottomLineWrestler: "loserOfBout#42",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 50,
      topLineWrestler: "winnerOfBout#46",
      bottomLineWrestler: "loserOfBout#41",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 51,
      topLineWrestler: "winnerOfBout#47",
      bottomLineWrestler: "loserOfBout#44",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 52,
      topLineWrestler: "winnerOfBout#48",
      bottomLineWrestler: "loserOfBout#43",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 53,
      topLineWrestler: "winnerOfBout#41",
      bottomLineWrestler: "winnerOfBout#42",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 8,
    },
    {
      matchNumber: 54,
      topLineWrestler: "winnerOfBout#43",
      bottomLineWrestler: "winnerOfBout#44",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 8,
    },
    {
      matchNumber: 55,
      topLineWrestler: "winnerOfBout#49",
      bottomLineWrestler: "winnerOfBout#50",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 9,
    },
    {
      matchNumber: 56,
      topLineWrestler: "winnerOfBout#51",
      bottomLineWrestler: "winnerOfBout#52",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 9,
    },
    {
      matchNumber: 57,
      topLineWrestler: "winnerOfBout#55",
      bottomLineWrestler: "loserOfBout#54",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 10,
    },
    {
      matchNumber: 58,
      topLineWrestler: "winnerOfBout#56",
      bottomLineWrestler: "loserOfBout#53",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 10,
    },
    {
      matchNumber: 59,
      topLineWrestler: "winnerOfBout#53",
      bottomLineWrestler: "winnerOfBout#54",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 11,
    },
    {
      matchNumber: 60,
      topLineWrestler: "winnerOfBout#57",
      bottomLineWrestler: "winnerOfBout#58",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 12,
    },
    {
      matchNumber: 61,
      topLineWrestler: "loserOfBout#57",
      bottomLineWrestler: "loserOfBout#58",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 12,
    },
    {
      matchNumber: 62,
      topLineWrestler: "loserOfBout#55",
      bottomLineWrestler: "loserOfBout#56",
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 12,
    },
  ];

  let populateBrackets = (arrayOfWrestlersandTeams2) => {
    console.log({ arrayOfWrestlersandTeams2 });

    for (let x = 0; x < empty32ManDoubleEliminationBracket.length; x++) {
      if (arrayOfWrestlersandTeams2[0]) {
        empty32ManDoubleEliminationBracket[
          x
        ].topLineWrestler = arrayOfWrestlersandTeams2.shift();
      }
      if (arrayOfWrestlersandTeams2[0]) {
        empty32ManDoubleEliminationBracket[
          x
        ].bottomLineWrestler = arrayOfWrestlersandTeams2.shift();
      }
    }
    console.log(empty32ManDoubleEliminationBracket);
  };

  return populateBrackets(formattedArrayOfWrestlersAndTeams);
};

bracketBuilder(seededArrayofWrestlersAndTeams);
