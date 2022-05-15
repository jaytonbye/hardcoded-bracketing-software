let referenceMatch = [
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
];

let roundRobinBuilder = (
  arrayOfCompetitorsAndTeams: {
    name: string;
    team: string;
    seed?: number;
  }[]
) => {
  //makes the number of competitors even (adds a bye if necessary)
  if (arrayOfCompetitorsAndTeams.length % 2 === 1) {
    arrayOfCompetitorsAndTeams.push({ name: "Bye", team: "Bye" });
  }

  let roundRobinBracket = [];

  for (let x = 0; x < arrayOfCompetitorsAndTeams.length; x++) {
    for (let y = x + 1; y < arrayOfCompetitorsAndTeams.length; y++) {
      roundRobinBracket.push({
        matchNumber: 999,
        topLineWrestler: { name: "bye" },
        bottomLineWrestler: { name: "bye" },
        winner: null,
        loser: null,
        score: null,
        dispatched: false,
        round: 1,
      });
    }
  }

  console.log(arrayOfCompetitorsAndTeams);
};

let people = [
  { name: "Wrestler Seeded1", team: "Team 1", seed: 1 },
  { name: "Wrestler Seeded2", team: "Team 2", seed: 2 },
  { name: "Wrestler Seeded3", team: "Team 3", seed: 3 },
  { name: "Wrestler Seeded4", team: "Team 4", seed: 4 },
  { name: "Wrestler Seeded5", team: "Team 5", seed: 5 },
];

roundRobinBuilder(people);
