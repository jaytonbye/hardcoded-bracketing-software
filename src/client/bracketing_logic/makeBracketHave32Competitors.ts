export let makeBracketHave32Competitors = (arrayOfWrestlersandTeams: any) => {
  //Makes sure there are 32 wrestlers in the bracket by adding byes
  for (let y = arrayOfWrestlersandTeams.length; y < 32; y++) {
    arrayOfWrestlersandTeams.push({ name: "bye", team: "bye", seed: y + 1 });
  }

  return arrayOfWrestlersandTeams;
};
