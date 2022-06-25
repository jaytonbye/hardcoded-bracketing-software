/*There may a bit of confusion with the word "round" as I have been using it to mean 2 different things. A single bracket will have multiple rounds (quarters, semis, finals, etc), while the entire tournament will also have tournament-rounds (We might not start round 1 of the heavyweight bracket until round 20 of the tournament). I'd like another word to describe tournament-round, but am unhappy with what I've come up with so far: heat, cycle, session, series????*/
//I have decide to user tournament-round and bracket-round.

//This function takes in a number (the number of competitors in single bracket) and returns an array of the number of matches there will be in each round of the bracket.
let determineNumberOfMatchesInEachBracketRoundForDoubleElimination = (
  bracketSize: number
): Array<number> => {
  let numberOfRoundsRequired: number = Math.ceil(Math.log2(bracketSize));
  let numberOfCompetitorsIfBracketWasFull: number = Math.pow(
    2,
    numberOfRoundsRequired
  );

  let numberOfByesInFirstRound: number =
    numberOfCompetitorsIfBracketWasFull - bracketSize;

  let numberOfMatchesInEachRound: Array<number> = [];
  for (let x = 0; x < numberOfRoundsRequired; x++) {
    if (x === 0) {
      numberOfMatchesInEachRound.push(
        numberOfCompetitorsIfBracketWasFull / 2 - numberOfByesInFirstRound
      );
    }
    if (x === 1) {
      numberOfMatchesInEachRound.push(
        (numberOfCompetitorsIfBracketWasFull / 4) * 3 - numberOfByesInFirstRound
      );
    }
    if (x >= 2) {
      numberOfMatchesInEachRound.push(
        (numberOfCompetitorsIfBracketWasFull / Math.pow(2, x + 1)) * 3
      );
    }
  }

  return numberOfMatchesInEachRound;
};

//The arrayOfBracketsAsArraysOfRoundSizes will take in an array of bracket sizes, and return an array of arrays, where each inner array represents a complete bracket, and each item in the inner array will be the number of matches that will be in each round.
let arrayOfBracketsWhereEachBracketIsAnArrayOfTheNumberOfMatchesRequiredThatBracketRound = (
  arrayOfBracketSizes: Array<number>
): Array<Array<number>> => {
  let finalArray: Array<Array<number>> = [];

  for (let x = 0; x < arrayOfBracketSizes.length; x++) {
    finalArray.push(
      determineNumberOfMatchesInEachBracketRoundForDoubleElimination(
        arrayOfBracketSizes[x]
      )
    );
  }
  return finalArray;
};

// The optimalRoundSpacingFunction will return an array of arrays. Each complete inner array represents a single bracket. Each item in the inner array will be the optimal number of matches to run that round (for that bracket), so that we never go over the maximum number of matches in a single tournament-round.
let optimalRoundSpacingFunction = (
  maxNumberOfMatchesPerTournamentRound: number,
  arrayOfBracketSizes: Array<number>
) => {
  let theArrayOfBracketsAsArraysOfRoundSizes: Array<
    Array<number>
  > = arrayOfBracketsWhereEachBracketIsAnArrayOfTheNumberOfMatchesRequiredThatBracketRound(
    arrayOfBracketSizes
  );

  //the length of this loop sucks, it's not right, we just forcefully exit the loop :(
  for (
    let numberOfMatchesPerBracketRound = 0;
    numberOfMatchesPerBracketRound < 999;
    numberOfMatchesPerBracketRound++
  ) {
    // console.log({ numberOfMatchesPerBracketRound });
    let totalNumberOfMatchesThisTournamentRoundCounter: number = 0;
    for (
      let weightClass = 0;
      weightClass < theArrayOfBracketsAsArraysOfRoundSizes.length;
      weightClass++
    ) {
      // console.log({ weightClass });
      //if there isn't a number, we put a 0 there. If we don't do this, it will break the accumulator
      if (
        !theArrayOfBracketsAsArraysOfRoundSizes[weightClass][
          numberOfMatchesPerBracketRound
        ]
      ) {
        theArrayOfBracketsAsArraysOfRoundSizes[weightClass].push(0);
      }

      totalNumberOfMatchesThisTournamentRoundCounter =
        totalNumberOfMatchesThisTournamentRoundCounter +
        theArrayOfBracketsAsArraysOfRoundSizes[weightClass][
          numberOfMatchesPerBracketRound
        ];

      if (
        totalNumberOfMatchesThisTournamentRoundCounter >
        maxNumberOfMatchesPerTournamentRound
      ) {
        theArrayOfBracketsAsArraysOfRoundSizes[weightClass].unshift(0);
        //We moved these to the next if statement, see below:

        // x = -1;
        // totalNumberOfMatchesThisRound = 0;
        //reseting x and the total Number of matches to run through the column again. This is necessary because sometimes a round needs to be delayed multiple times.

        //by moving the above code into this if statement, we only reset to the beginning once we reach the end. This is much more efficient for the computer to calculate, and will always keep the weight classes in order. If we do it the other way, the event will run with a higher efficiency, but the weights will not necessarily remain in order (if there is only 1 match in a weight class, it could potentially start earlier than then weight before it). It is also much more calculation intensive for the computer.
        if (weightClass === theArrayOfBracketsAsArraysOfRoundSizes.length - 1) {
          weightClass = -1;
          totalNumberOfMatchesThisTournamentRoundCounter = 0;
          //reseting x and the total Number of matches to run through the column again. This is necessary because sometimes a round needs to be delayed multiple times.
        }
      }
    }
    if (totalNumberOfMatchesThisTournamentRoundCounter === 0) {
      // console.log("breaking out of outer loop");
      break;
    }
  }
  // console.log({ theArrayOfBracketsAsArraysOfRoundSizes });
  return theArrayOfBracketsAsArraysOfRoundSizes;
};

// I cannot figure out when to stop the outer loop! 999 is an arbitrary number.
let numberOfMatchesPerRound = (
  numberOfMatchesInEachRoundOfEachDivision: number[][]
) => {
  let arrayOfMatchesPerTournamentRounds = [];
  for (let round = 0; round < 999; round++) {
    let totalMatchesTalliedThisRound: number = 0;
    for (
      let division = 0;
      division < numberOfMatchesInEachRoundOfEachDivision.length;
      division++
    ) {
      totalMatchesTalliedThisRound =
        totalMatchesTalliedThisRound +
        numberOfMatchesInEachRoundOfEachDivision[division][round];
    }
    if (!totalMatchesTalliedThisRound) {
      break;
    }

    arrayOfMatchesPerTournamentRounds.push(totalMatchesTalliedThisRound);
    totalMatchesTalliedThisRound = 0;
  }
  return arrayOfMatchesPerTournamentRounds;
};

// console.log("optimal:");
optimalRoundSpacingFunction(29, [16, 16, 16, 16, 16]);

// console.log("number of matches per tournament round");
// console.log(
//   numberOfMatchesPerRound(optimalRoundSpacingFunction(9, [8, 16, 9, 11, 6]))
// );

let allBracketSizes = [
  121,
  144,
  87,
  36,
  62,
  25,
  63,
  121,
  144,
  87,
  36,
  62,
  25,
  63,
  121,
  144,
  87,
  36,
  62,
  25,
  63,
  121,
  144,
  87,
  36,
  62,
  25,
  63,
  121,
  144,
  87,
  36,
  62,
  25,
  63,
  121,
  144,
  87,
  36,
  62,
  25,
  63,
  121,
  144,
  87,
  36,
  62,
  25,
  63,
];
let averageLengthOfAMatch = 7;
let numberOfMatsAtEvent = 80;
let lengthOfEachTournamentRound = 60;
let eventStartTimeInMinutes = 9 * 60;
let lengthOfWeighins = 20;
let amountofTimeBetweenWeighinsClosingAndWrestlingBeginning = 10;
let maximumNumberOfMatchesPerTournamentRound =
  (lengthOfEachTournamentRound / averageLengthOfAMatch) * numberOfMatsAtEvent;

let arrayOfOptimallySpacedRoundsForAllDivisions = optimalRoundSpacingFunction(
  maximumNumberOfMatchesPerTournamentRound,
  allBracketSizes
);

let determineStartTimesForAllDivisions = (
  eventStartTimeInMinutes: number,
  lengthOfEachTournamentRound: number,
  arrayOfOptimallySpacedRoundsForAllDivisions: number[][]
) => {
  for (
    let division = 0;
    division < arrayOfOptimallySpacedRoundsForAllDivisions.length;
    division++
  ) {
    let startTimeHasbeenDetermined = false;
    let thisDivisionsStartTime: any;
    let thisDivisionsEndTime: any;
    for (
      let tournamentRound = 0;
      tournamentRound <
      arrayOfOptimallySpacedRoundsForAllDivisions[division].length;
      tournamentRound++
    ) {
      if (
        arrayOfOptimallySpacedRoundsForAllDivisions[division][tournamentRound] >
          0 &&
        !startTimeHasbeenDetermined
      ) {
        thisDivisionsStartTime =
          eventStartTimeInMinutes +
          tournamentRound * lengthOfEachTournamentRound;
        startTimeHasbeenDetermined = true;
      }

      if (
        arrayOfOptimallySpacedRoundsForAllDivisions[division][
          tournamentRound
        ] == 0 &&
        startTimeHasbeenDetermined
      ) {
        thisDivisionsEndTime =
          eventStartTimeInMinutes +
          tournamentRound * lengthOfEachTournamentRound;

        console.log(
          `division # ${division} will weigh in from ${
            thisDivisionsStartTime / 60 -
            amountofTimeBetweenWeighinsClosingAndWrestlingBeginning / 60 -
            lengthOfWeighins / 60
          } to ${
            thisDivisionsStartTime / 60 -
            amountofTimeBetweenWeighinsClosingAndWrestlingBeginning / 60
          }, will begin wrestling at ${
            thisDivisionsStartTime / 60
          } and be completely finished by ${
            thisDivisionsEndTime / 60
          }. Matches in the championship round will be ${lengthOfEachTournamentRound} apart, and matches in the wrestle-back rounds will be ${
            lengthOfEachTournamentRound / 2
          } apart.`
        );
        console.log(" ");
        break;
      }
    }
  }
};

determineStartTimesForAllDivisions(
  eventStartTimeInMinutes,
  lengthOfEachTournamentRound,
  arrayOfOptimallySpacedRoundsForAllDivisions
);
let totalparticipants = 0;

for (let x = 0; x < allBracketSizes.length; x++) {
  totalparticipants = totalparticipants + allBracketSizes[x];
}

console.log({ totalparticipants });
