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

  //Makes sure there are 32 wrestlers in the bracket by adding byes
  for (let y = arrayOfWrestlersandTeams.length; y < 32; y++) {
    arrayOfWrestlersandTeams.push({ name: "bye", team: "bye", seed: y + 1 });
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

    for (let x = 0; x < initialArrayOfCompetitorsOrderedBySeed.length; x++) {
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
    for (let x = 0; x < formattedArrayOfWrestlersTeamsAndSeeds.length; x++) {
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
  return formattedArrayOfWrestlersTeamsAndSeeds;
};

let seededArrayofWrestlersAndTeams = handleSeedingFunction(
  formattedArrayOfWrestlersAndTeams
);

// This is the bracket builder. It will start by taking a tab separated list (in order of seeding from first to last) and maninpulating it into an array of objects where each object contains the wrestler's name and team name (this function is called the dataFormatter)
let bracketBuilder = (formattedArrayOfWrestlersAndTeams) => {
  let empty32ManDoubleEliminationBracket = [
    {
      matchNumber: 1,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 2,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 3,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 4,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 5,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 6,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 7,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 8,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 9,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 10,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 11,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 12,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 13,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 14,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 15,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 16,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 17,
      topLineWrestler: { name: "loserOfBout#1" },
      bottomLineWrestler: { name: "loserOfBout#2" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 18,
      topLineWrestler: { name: "loserOfBout#3" },
      bottomLineWrestler: { name: "loserOfBout#4" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 19,
      topLineWrestler: { name: "loserOfBout#5" },
      bottomLineWrestler: { name: "loserOfBout#6" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 20,
      topLineWrestler: { name: "loserOfBout#7" },
      bottomLineWrestler: { name: "loserOfBout#8" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 21,
      topLineWrestler: { name: "loserOfBout#9" },
      bottomLineWrestler: { name: "loserOfBout#10" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 22,
      topLineWrestler: { name: "loserOfBout#11" },
      bottomLineWrestler: { name: "loserOfBout#12" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 23,
      topLineWrestler: { name: "loserOfBout#13" },
      bottomLineWrestler: { name: "loserOfBout#14" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 24,
      topLineWrestler: { name: "loserOfBout#15" },
      bottomLineWrestler: { name: "loserOfBout#16" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 25,
      topLineWrestler: { name: "winnerOfBout#1" },
      bottomLineWrestler: { name: "winnerOfBout#2" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 26,
      topLineWrestler: { name: "winnerOfBout#3" },
      bottomLineWrestler: { name: "winnerOfBout#4" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 27,
      topLineWrestler: { name: "winnerOfBout#5" },
      bottomLineWrestler: { name: "winnerOfBout#6" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 28,
      topLineWrestler: { name: "winnerOfBout#7" },
      bottomLineWrestler: { name: "winnerOfBout#8" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 29,
      topLineWrestler: { name: "winnerOfBout#9" },
      bottomLineWrestler: { name: "winnerOfBout#10" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 30,
      topLineWrestler: { name: "winnerOfBout#11" },
      bottomLineWrestler: { name: "winnerOfBout#12" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 31,
      topLineWrestler: { name: "winnerOfBout#13" },
      bottomLineWrestler: { name: "winnerOfBout#14" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 32,
      topLineWrestler: { name: "winnerOfBout#15" },
      bottomLineWrestler: { name: "winnerOfBout#16" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 33,
      topLineWrestler: { name: "winnerOfBout#17" },
      bottomLineWrestler: { name: "loserOfBout#32" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 34,
      topLineWrestler: { name: "winnerOfBout#18" },
      bottomLineWrestler: { name: "loserOfBout#31" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 35,
      topLineWrestler: { name: "winnerOfBout#19" },
      bottomLineWrestler: { name: "loserOfBout#30" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 36,
      topLineWrestler: { name: "winnerOfBout#20" },
      bottomLineWrestler: { name: "loserOfBout#29" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 37,
      topLineWrestler: { name: "winnerOfBout#21" },
      bottomLineWrestler: { name: "loserOfBout#28" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 38,
      topLineWrestler: { name: "winnerOfBout#22" },
      bottomLineWrestler: { name: "loserOfBout#27" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 39,
      topLineWrestler: { name: "winnerOfBout#23" },
      bottomLineWrestler: { name: "loserOfBout#26" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 40,
      topLineWrestler: { name: "winnerOfBout#24" },
      bottomLineWrestler: { name: "loserOfBout#25" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 41,
      topLineWrestler: { name: "winnerOfBout#25" },
      bottomLineWrestler: { name: "winnerOfBout#26" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 42,
      topLineWrestler: { name: "winnerOfBout#27" },
      bottomLineWrestler: { name: "winnerOfBout#28" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 43,
      topLineWrestler: { name: "winnerOfBout#29" },
      bottomLineWrestler: { name: "winnerOfBout#30" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 44,
      topLineWrestler: { name: "winnerOfBout#31" },
      bottomLineWrestler: { name: "winnerOfBout#32" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 45,
      topLineWrestler: { name: "winnerOfBout#33" },
      bottomLineWrestler: { name: "winnerOfBout#34" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 46,
      topLineWrestler: { name: "winnerOfBout#35" },
      bottomLineWrestler: { name: "winnerOfBout#36" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 47,
      topLineWrestler: { name: "winnerOfBout#37" },
      bottomLineWrestler: { name: "winnerOfBout#38" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 48,
      topLineWrestler: { name: "winnerOfBout#39" },
      bottomLineWrestler: { name: "winnerOfBout#40" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 49,
      topLineWrestler: { name: "winnerOfBout#45" },
      bottomLineWrestler: { name: "loserOfBout#42" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 50,
      topLineWrestler: { name: "winnerOfBout#46" },
      bottomLineWrestler: { name: "loserOfBout#41" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 51,
      topLineWrestler: { name: "winnerOfBout#47" },
      bottomLineWrestler: { name: "loserOfBout#44" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 52,
      topLineWrestler: { name: "winnerOfBout#48" },
      bottomLineWrestler: { name: "loserOfBout#43" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 53,
      topLineWrestler: { name: "winnerOfBout#41" },
      bottomLineWrestler: { name: "winnerOfBout#42" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 8,
    },
    {
      matchNumber: 54,
      topLineWrestler: { name: "winnerOfBout#43" },
      bottomLineWrestler: { name: "winnerOfBout#44" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 8,
    },
    {
      matchNumber: 55,
      topLineWrestler: { name: "winnerOfBout#49" },
      bottomLineWrestler: { name: "winnerOfBout#50" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 9,
    },
    {
      matchNumber: 56,
      topLineWrestler: { name: "winnerOfBout#51" },
      bottomLineWrestler: { name: "winnerOfBout#52" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 9,
    },
    {
      matchNumber: 57,
      topLineWrestler: { name: "winnerOfBout#55" },
      bottomLineWrestler: { name: "loserOfBout#54" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 10,
    },
    {
      matchNumber: 58,
      topLineWrestler: { name: "winnerOfBout#56" },
      bottomLineWrestler: { name: "loserOfBout#53" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 10,
    },
    {
      matchNumber: 59,
      topLineWrestler: { name: "winnerOfBout#53" },
      bottomLineWrestler: { name: "winnerOfBout#54" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 11,
    },
    {
      matchNumber: 60,
      topLineWrestler: { name: "winnerOfBout#57" },
      bottomLineWrestler: { name: "winnerOfBout#58" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 12,
    },
    {
      matchNumber: 61,
      topLineWrestler: { name: "loserOfBout#57" },
      bottomLineWrestler: { name: "loserOfBout#58" },
      winner: "none",
      loser: "none",
      score: "none",
      dispatched: false,
      round: 12,
    },
    {
      matchNumber: 62,
      topLineWrestler: { name: "loserOfBout#55" },
      bottomLineWrestler: { name: "loserOfBout#56" },
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
