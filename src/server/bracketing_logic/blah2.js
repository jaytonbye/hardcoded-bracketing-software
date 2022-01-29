let numberOfCompetitors = 32;
let numberOfMatches = numberOfCompetitors - 1;
let matchesArray = [];
let numberOfRounds = Math.log2(numberOfCompetitors);

// for (let x = 1; x <= numberOfMatches; x++) {
//   matchesArray.push({
//     match_number: x,
//     wrestler1: null,
//     wrestler2: null,
//     dispatched: false,
//     result: null,
//   });
// }

let secondRoundBouts = numberOfCompetitors / 2;
// I moved this code inside of the other for ;oop
// for (
//   let i = secondRoundBouts + 1;
//   i <= secondRoundBouts + secondRoundBouts / 2;
//   i++
// ) {
//   console.log(i);
// }

// for (let x = 1; x <= numberOfRounds; x++) {
//   for (let y = 1; y <= numberOfCompetitors / Math.pow(2, x); y++) {

//     let incrementBy= Math.pow(2,x)
//     matchesArray.push({
//       match_number: y,
//       wrestler1: null,
//       wrestler2: null,
//       dispatched: false,
//       result: null,
//       round: x,
//     });
//   }
// }

// console.log(matchesArray);
// I did it
// for (let x = 1; x <= numberOfRounds; x++) {
for (
  let i = secondRoundBouts + 1;
  i < secondRoundBouts + secondRoundBouts / 1;
  i++
) {
  // console.log(i);
  matchesArray.push({
    made: "wayneCarl",
    match_number: i,
    wrestler1: null,
    wrestler2: null,
    dispatched: false,
    result: null,
  });
}
// }

console.log(matchesArray);
