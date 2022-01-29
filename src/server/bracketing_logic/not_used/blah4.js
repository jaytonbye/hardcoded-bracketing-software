let numberOfCompetitors = 8;
let numberOfMatches = numberOfCompetitors - 1;
let matchesArray = [];
let numberOfRounds = Math.log2(numberOfCompetitors);

let competitorsArray = [1];
let finalCompetitorsArray = [];
let competitorsArrayLength;

let arrayChanger = (myArr, round) => {
  let pimpshit = [];

  for (let x = 0; x < myArr.length; x++) {
    if (x % 2 === 0) {
      pimpshit.push(myArr[x]);
      pimpshit.push(sumOfEachMatchupForThisRound - myArr[x]);
    }
    if (x % 2 === 1) {
      pimpshit.push(sumOfEachMatchupForThisRound - myArr[x]);
      pimpshit.push(myArr[x]);
    }

    console.log(pimpshit);
    return pimpshit;
  }
};

for (let x = 1; x <= numberOfRounds; x++) {
  let sumOfEachMatchupForThisRound = Math.pow(2, x + 1) + 1;
  arrayChanger([1, 2], sumOfEachMatchupForThisRound);
}
