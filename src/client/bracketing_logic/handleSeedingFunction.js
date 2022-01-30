// as of writing this comment, this function does not correctly order the seeds. It orders them in a way that will have the same matchups, but the match numbers are out of order. I have decided to continue with the code, and worry about it later.

export let handleSeedingFunction = (initialArrayOfCompetitorsOrderedBySeed) => {
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
};
