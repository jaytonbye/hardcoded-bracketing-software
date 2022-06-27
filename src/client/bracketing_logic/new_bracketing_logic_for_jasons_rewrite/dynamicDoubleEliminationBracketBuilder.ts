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

// This spreadsheet was very useful when building this function: https://docs.google.com/spreadsheets/d/1qb4QT_dRZRUHD9vxDSk7seoSj_opbEFAlBPB3HS7hQE/edit?usp=sharing
//This function will only work with powers of 2, starting at 4. Examples: 4,8,16,32,64, 128. I have not dealt with the edge cases of 1 and 2 yet.
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
  //The brackets are now filled with match numbers.

  //We will now label the bracketRounds for each match.
  //Note:
  // If there are 64 competitors, this is how many matches will be in each round:
  // [32, 16, 16, 16, 8, 8, 8 , 4, 4, 4, 2, 2, 2, 1, 1 ]. It starts with a single championship round, then loops the following 3 rounds: championship round, wrestle back1 , wrestle back 2. It finishes by running the final and then the 3rd/4th place match.
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

  //This is where we will inject topLineWrestlerWillBe and bottomLineWrestlerWillBe into the championship matches.
  let initialCounterStartingatRound2 = 1;
  let reducesByHalf = numberOfCompetitors / 2;
  let firstTimeThrough = true;
  for (
    let round = 2;
    round <= numberOfChampionshipAndWrestleBackRoundsRequired;
    round = round + 3
  ) {
    for (let x = 0; x < arrayOfBouts.length; x++) {
      if (arrayOfBouts[x].bracketRound === round) {
        arrayOfBouts[
          x
        ].topLineWrestlerWillBe = `winnerOfMatch#${initialCounterStartingatRound2}`;
        initialCounterStartingatRound2++;
        arrayOfBouts[
          x
        ].bottomLineWrestlerWillBe = `winnerOfMatch#${initialCounterStartingatRound2}`;
        initialCounterStartingatRound2++;
      }
    }
    if (firstTimeThrough) {
      firstTimeThrough = false;
    } else {
      initialCounterStartingatRound2 =
        initialCounterStartingatRound2 + reducesByHalf;
      reducesByHalf = reducesByHalf / 2;
    }
  }

  //Next we will inject all of the first round losers into the first round of wrestlebacks:
  let initialCounterStartingatRound3 = 1;
  for (let x = 0; x < arrayOfBouts.length; x++) {
    if (arrayOfBouts[x].bracketRound === 3) {
      arrayOfBouts[
        x
      ].topLineWrestlerWillBe = `loserOfMatch#${initialCounterStartingatRound3}`;
      initialCounterStartingatRound3++;
      arrayOfBouts[
        x
      ].bottomLineWrestlerWillBe = `loserOfMatch#${initialCounterStartingatRound3}`;
      initialCounterStartingatRound3++;
    }
  }
  //injection complete

  //attempt 3 begins
  let determineHowManyMatchesAreInTheRound = (round: number) => {
    if (round > numberOfChampionshipAndWrestleBackRoundsRequired) {
      return 0;
    }
    let currentNumberOfMatches = numberOfCompetitors / 2;
    for (let x = 1; x <= round; x++) {
      if (x % 3 === 2) {
        currentNumberOfMatches = currentNumberOfMatches / 2;
      }
    }
    return currentNumberOfMatches;
  };

  let firstTimeThroughWrestleBackA = true;
  let topMatchNumberOfPreviousWB = 1;
  for (let x = 0; x < arrayOfBouts.length; x++) {
    //every 3 rounds, starting at round 4
    if (
      arrayOfBouts[x].bracketRound % 3 === 1 &&
      arrayOfBouts[x].bracketRound !== 1
    ) {
      arrayOfBouts[x].topLineWrestlerWillBe = `winnerOfMatch#${
        arrayOfBouts[x].matchNumber -
        determineHowManyMatchesAreInTheRound(arrayOfBouts[x].bracketRound)
      }`;
    }

    //every 3 rounds, starting at round 5 (championship rounds)
    if (
      arrayOfBouts[x].bracketRound % 3 === 2 &&
      arrayOfBouts[x].bracketRound !== 2
    ) {
      //Do nothing. I could probably use this if statement to handle matches on the front, it would untangle some spaghetti.
      if (arrayOfBouts[x].bracketRound > 6) firstTimeThroughWrestleBackA = true;
    }

    if (
      arrayOfBouts[x].bracketRound % 3 === 0 &&
      arrayOfBouts[x].bracketRound !== 3 &&
      firstTimeThroughWrestleBackA
    ) {
      topMatchNumberOfPreviousWB =
        arrayOfBouts[x].matchNumber -
        determineHowManyMatchesAreInTheRound(arrayOfBouts[x].bracketRound - 1) -
        determineHowManyMatchesAreInTheRound(arrayOfBouts[x].bracketRound - 2);
      console.log({ topMatchNumberOfPreviousWB });
      firstTimeThroughWrestleBackA = false;
    }

    //every 3 rounds, starting at round 6
    if (
      arrayOfBouts[x].bracketRound % 3 === 0 &&
      arrayOfBouts[x].bracketRound !== 3
    ) {
      arrayOfBouts[
        x
      ].topLineWrestlerWillBe = `winnerOfMatch#${topMatchNumberOfPreviousWB}`;
      topMatchNumberOfPreviousWB++;
      arrayOfBouts[
        x
      ].bottomLineWrestlerWillBe = `winnerOfMatch#${topMatchNumberOfPreviousWB}`;
      topMatchNumberOfPreviousWB++;
    }
  }
  //attempt 3 ends

  //attempt two was a failure
  // //attempt two at inserting all of the winners on the loser side (round 3 is already complete, so we start in round 4.)
  // let initialCounterStartingatRound4 =
  //   numberOfCompetitors / 2 + numberOfCompetitors / 4 + 1;
  // let firstTimeInRound = true;
  // for (let x = 0; x < arrayOfBouts.length; x++) {
  //   for (
  //     let round = 4;
  //     round <= numberOfChampionshipAndWrestleBackRoundsRequired;
  //     round++
  //   ) {
  //     //2of2wrestlebackround
  //     if (round % 3 === 1) {
  //       if (arrayOfBouts[x].bracketRound === round) {
  //         if (firstTimeInRound) {
  //           initialCounterStartingatRound4 = arrayOfBouts[x].matchNumber;
  //           firstTimeInRound = false;
  //         }
  //         arrayOfBouts[
  //           x
  //         ].topLineWrestlerWillBe = initialCounterStartingatRound4;
  //         initialCounterStartingatRound4++;
  //       }
  //     }
  //     //championship round
  //     if (round % 3 === 2) {
  //       //nothing happens
  //     }

  //     //1of2wrestlebackround
  //     if (round % 3 === 0) {
  //       if (arrayOfBouts[x].bracketRound === round) {
  //         arrayOfBouts[
  //           x
  //         ].topLineWrestlerWillBe = initialCounterStartingatRound4;
  //         initialCounterStartingatRound4++;
  //         arrayOfBouts[
  //           x
  //         ].bottomLineWrestlerWillBe = initialCounterStartingatRound4;
  //         initialCounterStartingatRound4++;
  //       }
  //     }

  //     //     //this block of code needs to run after round 6 completes.
  //     // console.log("deep in it!");
  //     // initialCounterStartingatRound4 =
  //     //   initialCounterStartingatRound4 + reducesByHalf2;
  //     // reducesByHalf2 = reducesByHalf2 / 2;
  //   }
  // }

  //This code fucking sucked!
  // //Continuing to work on the loser side, we will now insert the winners of rounds 3,6,9, etc. into the bouts from round 4,7,10,etc.

  // let initialCounterStartingatRound4 =
  //   numberOfCompetitors / 2 + numberOfCompetitors / 4 + 1;
  // let reducesByHalf2 = numberOfCompetitors / 4;

  // //this ridiculous for loop will start at round 4 (a wrestleback), and hit every wrestleback round (4,6,7,9,10,12, etc.)
  // for (
  //   let round = 4;
  //   round <= numberOfChampionshipAndWrestleBackRoundsRequired;
  //   round++
  // ) {
  //   for (let x = 0; x < arrayOfBouts.length; x++) {
  //     //this if statement removes the championship rounds
  //     if (round % 3 === 2) {
  //       continue;
  //     }
  //     //if wrestlebackPart 1
  //     if (round % 3 === 0) {
  //       if (arrayOfBouts[x].bracketRound === round) {
  //         arrayOfBouts[
  //           x
  //         ].topLineWrestlerWillBe = `winnerOfMatch#${initialCounterStartingatRound4}`;
  //         initialCounterStartingatRound4++;
  //         arrayOfBouts[
  //           x
  //         ].bottomLineWrestlerWillBe = `winnerOfMatch#${initialCounterStartingatRound4}`;
  //         initialCounterStartingatRound4++;
  //       }
  //     }
  //     //this block of code needs to run after round 6 completes.
  //     initialCounterStartingatRound4 =
  //       initialCounterStartingatRound4 + reducesByHalf2;
  //     reducesByHalf2 = reducesByHalf2 / 2;

  //     //if wrestlebackPart 2
  //     if (round % 3 === 1) {
  //       if (arrayOfBouts[x].bracketRound === round) {
  //         arrayOfBouts[
  //           x
  //         ].topLineWrestlerWillBe = `winnerOfMatch#${initialCounterStartingatRound4}`;
  //         initialCounterStartingatRound4++;
  //       }
  //     }
  //   }
  // }

  //Here is the hard part (I think as I write this), moving the losers in the championship bracket to the correct spot in the wrestlebacks. It should be noted that this is the only part of this function that I would need to change if I decide I am unhappy with the layout of the wrestlebacks.
  let lowestMatchNumberInThisChampionRound;
  let highestMatchNumberInThisChampionRound;
  for (
    let round = 2;
    round <= numberOfChampionshipAndWrestleBackRoundsRequired;
    round++
  ) {
    //championship round
    if (round % 3 === 2) {
      for (let x = 0; x < arrayOfBouts.length; x++) {
        if (arrayOfBouts[x].bracketRound === round) {
          highestMatchNumberInThisChampionRound = arrayOfBouts[x].matchNumber;
        }
      }
      for (let x = arrayOfBouts.length - 1; x >= 0; x--) {
        if (arrayOfBouts[x].bracketRound === round) {
          lowestMatchNumberInThisChampionRound = arrayOfBouts[x].matchNumber;
        }
      }
    }
    //wrestleback part 1
    if (round % 3 === 0) {
    }
    //wrestleback part 2
    if (round % 3 === 1) {
      for (let x = 0; x < arrayOfBouts.length; x++) {
        //Descending
        if (
          arrayOfBouts[x].bracketRound % 6 === 4 &&
          arrayOfBouts[x].bracketRound === round
        ) {
          arrayOfBouts[
            x
          ].bottomLineWrestlerWillBe = `loserOfMatch#${highestMatchNumberInThisChampionRound}`;
          highestMatchNumberInThisChampionRound--;
        }
        //Ascending
        if (
          arrayOfBouts[x].bracketRound % 6 === 1 &&
          arrayOfBouts[x].bracketRound === round
        ) {
          arrayOfBouts[
            x
          ].bottomLineWrestlerWillBe = `loserOfMatch#${lowestMatchNumberInThisChampionRound}`;
          lowestMatchNumberInThisChampionRound++;
        }
      }
    }
  }
  //Next we inject winnerWillGoTo and loserWillGoTo

  //Lastly, we inject the wrestlerIDs

  //If we wanted to inject matches for 5th/6th and or 7th/8th, we would do it here:

  for (let x = 150; x < 252; x++) {
    console.log(arrayOfBouts[x]);
  }
  //finished!
  // console.log(arrayOfBouts);

  console.log({ numberOfCompetitors });
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
