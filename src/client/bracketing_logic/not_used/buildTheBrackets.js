export let bracketBuilder = (formattedArrayOfWrestlersAndTeams) => {
  let empty32ManDoubleEliminationBracket = [
    {
      matchNumber: 1,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 2,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 3,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 4,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 5,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 6,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 7,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 8,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 9,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 10,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 11,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 12,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 13,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 14,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 15,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 16,
      topLineWrestler: { name: "bye" },
      bottomLineWrestler: { name: "bye" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 1,
    },
    {
      matchNumber: 17,
      topLineWrestler: { name: "winnerOfBout#1" },
      bottomLineWrestler: { name: "winnerOfBout#2" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 18,
      topLineWrestler: { name: "winnerOfBout#3" },
      bottomLineWrestler: { name: "winnerOfBout#4" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 19,
      topLineWrestler: { name: "winnerOfBout#5" },
      bottomLineWrestler: { name: "winnerOfBout#6" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 20,
      topLineWrestler: { name: "winnerOfBout#7" },
      bottomLineWrestler: { name: "winnerOfBout#8" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 21,
      topLineWrestler: { name: "winnerOfBout#9" },
      bottomLineWrestler: { name: "winnerOfBout#10" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 22,
      topLineWrestler: { name: "winnerOfBout#11" },
      bottomLineWrestler: { name: "winnerOfBout#12" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 23,
      topLineWrestler: { name: "winnerOfBout#13" },
      bottomLineWrestler: { name: "winnerOfBout#14" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },
    {
      matchNumber: 24,
      topLineWrestler: { name: "winnerOfBout#15" },
      bottomLineWrestler: { name: "winnerOfBout#16" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 2,
    },

    {
      matchNumber: 25,
      topLineWrestler: { name: "loserOfBout#1" },
      bottomLineWrestler: { name: "loserOfBout#2" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 26,
      topLineWrestler: { name: "loserOfBout#3" },
      bottomLineWrestler: { name: "loserOfBout#4" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 27,
      topLineWrestler: { name: "loserOfBout#5" },
      bottomLineWrestler: { name: "loserOfBout#6" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 28,
      topLineWrestler: { name: "loserOfBout#7" },
      bottomLineWrestler: { name: "loserOfBout#8" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 29,
      topLineWrestler: { name: "loserOfBout#9" },
      bottomLineWrestler: { name: "loserOfBout#10" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 30,
      topLineWrestler: { name: "loserOfBout#11" },
      bottomLineWrestler: { name: "loserOfBout#12" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 31,
      topLineWrestler: { name: "loserOfBout#13" },
      bottomLineWrestler: { name: "loserOfBout#14" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 32,
      topLineWrestler: { name: "loserOfBout#15" },
      bottomLineWrestler: { name: "loserOfBout#16" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 3,
    },
    {
      matchNumber: 33,
      topLineWrestler: { name: "winnerOfBout#25" },
      bottomLineWrestler: { name: "loserOfBout#24" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 34,
      topLineWrestler: { name: "winnerOfBout#26" },
      bottomLineWrestler: { name: "loserOfBout#23" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 35,
      topLineWrestler: { name: "winnerOfBout#27" },
      bottomLineWrestler: { name: "loserOfBout#22" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 36,
      topLineWrestler: { name: "winnerOfBout#28" },
      bottomLineWrestler: { name: "loserOfBout#21" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 37,
      topLineWrestler: { name: "winnerOfBout#29" },
      bottomLineWrestler: { name: "loserOfBout#20" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 38,
      topLineWrestler: { name: "winnerOfBout#30" },
      bottomLineWrestler: { name: "loserOfBout#19" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 39,
      topLineWrestler: { name: "winnerOfBout#31" },
      bottomLineWrestler: { name: "loserOfBout#18" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 40,
      topLineWrestler: { name: "winnerOfBout#32" },
      bottomLineWrestler: { name: "loserOfBout#17" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 4,
    },
    {
      matchNumber: 41,
      topLineWrestler: { name: "winnerOfBout#17" },
      bottomLineWrestler: { name: "winnerOfBout#18" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 42,
      topLineWrestler: { name: "winnerOfBout#19" },
      bottomLineWrestler: { name: "winnerOfBout#20" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 43,
      topLineWrestler: { name: "winnerOfBout#21" },
      bottomLineWrestler: { name: "winnerOfBout#22" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 44,
      topLineWrestler: { name: "winnerOfBout#23" },
      bottomLineWrestler: { name: "winnerOfBout#24" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 5,
    },
    {
      matchNumber: 45,
      topLineWrestler: { name: "winnerOfBout#33" },
      bottomLineWrestler: { name: "winnerOfBout#34" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 46,
      topLineWrestler: { name: "winnerOfBout#35" },
      bottomLineWrestler: { name: "winnerOfBout#36" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 47,
      topLineWrestler: { name: "winnerOfBout#37" },
      bottomLineWrestler: { name: "winnerOfBout#38" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 48,
      topLineWrestler: { name: "winnerOfBout#39" },
      bottomLineWrestler: { name: "winnerOfBout#40" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 6,
    },
    {
      matchNumber: 49,
      topLineWrestler: { name: "winnerOfBout#45" },
      bottomLineWrestler: { name: "loserOfBout#42" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 50,
      topLineWrestler: { name: "winnerOfBout#46" },
      bottomLineWrestler: { name: "loserOfBout#41" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 51,
      topLineWrestler: { name: "winnerOfBout#47" },
      bottomLineWrestler: { name: "loserOfBout#44" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 52,
      topLineWrestler: { name: "winnerOfBout#48" },
      bottomLineWrestler: { name: "loserOfBout#43" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 7,
    },
    {
      matchNumber: 53,
      topLineWrestler: { name: "winnerOfBout#41" },
      bottomLineWrestler: { name: "winnerOfBout#42" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 8,
    },
    {
      matchNumber: 54,
      topLineWrestler: { name: "winnerOfBout#43" },
      bottomLineWrestler: { name: "winnerOfBout#44" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 8,
    },
    {
      matchNumber: 55,
      topLineWrestler: { name: "winnerOfBout#49" },
      bottomLineWrestler: { name: "winnerOfBout#50" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 9,
    },
    {
      matchNumber: 56,
      topLineWrestler: { name: "winnerOfBout#51" },
      bottomLineWrestler: { name: "winnerOfBout#52" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 9,
    },
    {
      matchNumber: 57,
      topLineWrestler: { name: "winnerOfBout#55" },
      bottomLineWrestler: { name: "loserOfBout#54" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 10,
    },
    {
      matchNumber: 58,
      topLineWrestler: { name: "winnerOfBout#56" },
      bottomLineWrestler: { name: "loserOfBout#53" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 10,
    },
    {
      matchNumber: 59,
      topLineWrestler: { name: "winnerOfBout#53" },
      bottomLineWrestler: { name: "winnerOfBout#54" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 11,
    },
    {
      matchNumber: 60,
      topLineWrestler: { name: "winnerOfBout#57" },
      bottomLineWrestler: { name: "winnerOfBout#58" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 12,
    },
    {
      matchNumber: 61,
      topLineWrestler: { name: "loserOfBout#57" },
      bottomLineWrestler: { name: "loserOfBout#58" },
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      round: 12,
    },
    {
      matchNumber: 62,
      topLineWrestler: { name: "loserOfBout#55" },
      bottomLineWrestler: { name: "loserOfBout#56" },
      winner: null,
      loser: null,
      score: null,
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
    return empty32ManDoubleEliminationBracket;
  };

  return populateBrackets(formattedArrayOfWrestlersAndTeams);
};
