let sampleBout = {
  matchNumber: 1,
  topLineWrestler: 123, // an ID in the database or null, representing a bye
  bottomLineWrestler: 132, //an ID in the database
  winner: null,
  loser: null,
  score: null,
  dispatched: false,
  dispatchedToMatNumber: null,
  round: 1,
  winnerWillGoTo: null, // "topLineOfMatchNumber73"
  loserWillGoTo: null, //"bottomLineOfMatchNumber83"
  topLineWrestlerWillBe: null,
  bottomLineWrestlerWillBe: null,
  isAChampionshipMatch: true, //will be true for matches that are not wrestlebacks. Will this help us differentiate between winners and losers brackets? For display purposes, how do we handle 5th/6th and 7th/8th bouts? This is part of that discussion.
  // boutNumberOfEntireEvent: 1 // We may potentially add this down the road.
};

let dynamicallyBuildDoubleEliminationBrackets = (
  arrayOfIds: number[]
): [Ibout] => {
  let arrayOfBouts: any | [Ibout] = []; //checkTS
  let numberOfCompetitors = arrayOfIds.length;
  let numberOfMatchesInTheBracket = numberOfCompetitors * 2 - 4; //this is with a wrestleback to 3rd and 4th place. Wrestlebacks to 5th, 6th, 7th, or 8th can be added afterwards if necessary.
  let numberOfChampionshipRoundsRequired = Math.log2(numberOfCompetitors);
  let numberOfChampionshipAndWrestleBackRoundsRequired =
    numberOfChampionshipRoundsRequired * 3 - 3;

  //The first thing we do is build empty brackets with the correct number of matches
  for (let x = 0; x < numberOfMatchesInTheBracket; x++) {
    arrayOfBouts.push({
      matchNumber: x + 1,
      topLineWrestlerID: null,
      bottomLineWrestlerID: null,
      winner: null,
      loser: null,
      score: null,
      dispatched: false,
      dispatchedToMatNumber: null,
      bracketRound: null, //should I do this now?
      winnerWillGoTo: "unknown",
      loserWillGoTo: "unknown",
      topLineWrestlerWillBe: "unknown",
      bottomLineWrestlerWillBe: "unknown",
      isAChampionshipMatch: null,
    });
  }

  //We will now label the bracketRounds
  // If there are 64 competitors, this is how many matches will be in each round:
  // [32, 16, 16, 16, 8, 8, 8 , 4, 4, 4, 2, 2, 2, 1, 1 ]. It starts with a single championship round, then loops the following 3 rounds: championship round, wrestle back1 , wrestle back 2. It finishes by running the final and then the 3rd/4th plac match.
  let lowestMatchNumberInThisRound = 0;
  let highestMatchNumberInThisRound = numberOfCompetitors / 2;
  let lowHighDifferenceInTHisROund =
    highestMatchNumberInThisRound - lowestMatchNumberInThisRound;
  for (
    let round = 1;
    round <= numberOfChampionshipAndWrestleBackRoundsRequired;
    round++
  ) {
    for (let x = 0; x < arrayOfBouts.length; x++) {
      if (
        arrayOfBouts[x].matchNumber <= highestMatchNumberInThisRound &&
        arrayOfBouts[x].matchNumber > lowestMatchNumberInThisRound
      ) {
        arrayOfBouts[x].bracketRound = round;
      }
    }

    console.log({ round });
    console.log({ lowestMatchNumberInThisRound });
    console.log({ highestMatchNumberInThisRound });

    //this if/else statement halves the number of matches in the currentRound, every 3 rounds.
    if ((round - 1) % 3 === 0) {
      lowestMatchNumberInThisRound =
        lowestMatchNumberInThisRound + lowHighDifferenceInTHisROund;
      highestMatchNumberInThisRound =
        highestMatchNumberInThisRound + lowHighDifferenceInTHisROund / 2;
      lowHighDifferenceInTHisROund = lowHighDifferenceInTHisROund / 2;
    } else {
      lowestMatchNumberInThisRound = highestMatchNumberInThisRound;
      highestMatchNumberInThisRound =
        highestMatchNumberInThisRound + lowHighDifferenceInTHisROund;
    }
  }

  //finished!
  console.log(arrayOfBouts);
  console.log({ numberOfCompetitors });
  console.log({ numberOfMatchesInTheBracket });
  return arrayOfBouts;
};

dynamicallyBuildDoubleEliminationBrackets([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
]);

interface Ibout {
  matchNumber: number;
  topLineWrestlerID: number | null;
  bottomLineWrestlerID: number | null;
  winner: null; //will always be null in this file. If we use this interface elsewhere, it could change
  loser: null;
  score: null;
  dispatched: boolean;
  dispatchedToMatNumber: null;
  bracketRound: number;
  winnerWillGoTo: string; // "topLineOfMatchNumber73"
  loserWillGoTo: string; //"bottomLineOfMatchNumber83"
  topLineWrestlerWillBe: string; //"winnerOfMatch3"
  bottomLineWrestlerWillBe: string; //"loserOfMatch7"
  isAChampionshipMatch: boolean | null;
}
