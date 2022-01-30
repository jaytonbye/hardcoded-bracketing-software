let trueFinalArray = [];

//hardcoding a list of fake competitors to work with
let allCompetitorsForThisDivision = [
  {
    first_name: "jason",
    last_name: "layton",
    team: "dynamic",
  },
  { first_name: "ralph", last_name: "rjor", team: "cool guys" },
  { first_name: "Jude", last_name: "Crude", team: "hammers" },
  { first_name: "Wayne", last_name: "Pain", team: "gamers" },
  { first_name: "Lj", last_name: "mcsmurph", team: "purple" },
  // { first_name: "Peter", last_name: "micks", team: "magic" },
  // { first_name: "paul", last_name: "call", team: "all-in" },
];

//this function takes in an array of competitors, and returns an array that adds in competitors with byes.
let formBrackets = (competitorsArray) => {
  let numberOfCompetitors = competitorsArray.length;

  let competitorsArrayWithByes = [...competitorsArray];

  //This math equation was solved by Dr. Modi
  let numberOfByesToCreate =
    Math.pow(2, Math.ceil(Math.log2(numberOfCompetitors))) -
    numberOfCompetitors;

  for (let x = 0; x < numberOfByesToCreate; x++) {
    competitorsArrayWithByes.push({
      first_name: "bye",
      last_name: "bye",
      team: "bye",
    });
  }

  let binarySplitting = (peopleArray) => {
    let topArray = [];
    let botArray = [];
    for (x = 0; x < peopleArray.length; x++) {
      if (x % 4 === 0 || x % 4 === 3) {
        topArray.push(peopleArray[x]);
      } else {
        botArray.push(peopleArray[x]);
      }
    }

    if (botArray.length === 2) {
      let finalArray = topArray.concat(botArray);

      trueFinalArray = trueFinalArray.concat(finalArray);

      //return finalArray;
    } else {
      binarySplitting(topArray);
      binarySplitting(botArray);
    }
  };

  binarySplitting(competitorsArrayWithByes);
};

formBrackets(allCompetitorsForThisDivision);

let arrayOfWrestlersInOrder = trueFinalArray;

let allMatchesArray = [];

for (let x = 0; x < arrayOfWrestlersInOrder.length; x++) {
  if (x % 2 === 0) {
    allMatchesArray.push({
      wrestler1: arrayOfWrestlersInOrder[x],
      wrestler2: arrayOfWrestlersInOrder[x + 1],
      bout_number: x / 2 + 1,
      dispatched: false,
      completed: false,
    });
  }
}

console.log(allMatchesArray);
