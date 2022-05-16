//in order to run a round robin tournament, we use the circle method: https://en.wikipedia.org/wiki/Round-robin_tournament

export let roundRobinBuilder = (
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

  //this function allows you to move an index to another index in an array.
  function arraymove(arr: any, fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  let roundRobinBracket = [];
  let matchNumberCounter = 1;
  for (let x = 0; x < arrayOfCompetitorsAndTeams.length - 1; x++) {
    for (let y = 0; y < arrayOfCompetitorsAndTeams.length / 2; y++) {
      roundRobinBracket.push({
        matchNumber: matchNumberCounter,
        topLineWrestler: arrayOfCompetitorsAndTeams[0 + y],
        bottomLineWrestler:
          arrayOfCompetitorsAndTeams[arrayOfCompetitorsAndTeams.length - 1 - y],
        winner: null as null,
        loser: null as null,
        score: null as null,
        dispatched: false,
        round: x + 1,
      });
      matchNumberCounter++;
    }

    // The arraymove function handles the move required for the circle method.
    arraymove(
      arrayOfCompetitorsAndTeams,
      arrayOfCompetitorsAndTeams.length - 1,
      1
    );
  }

  return roundRobinBracket;
};
