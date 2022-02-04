export let dataFormatter = (tabSeparatedWrestlersString) => {
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

  //hardcoded
  //Makes sure there are 32 wrestlers in the bracket by adding byes
  for (let y = arrayOfWrestlersandTeams.length; y < 32; y++) {
    arrayOfWrestlersandTeams.push({ name: "bye", team: "bye", seed: y + 1 });
  }

  return arrayOfWrestlersandTeams;
};
