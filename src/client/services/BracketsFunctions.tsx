let addingActualNameAndActualTeamName = (
  bouts: any,
  registrationInformationForThisDivision: any
) => {
  let theNewBoutsArray: any = [];
  console.log("for loop begins");
  for (let x = 0; x < bouts.length; x++) {
    theNewBoutsArray.push({
      ...bouts[x],
    });
    for (let y = 0; y < registrationInformationForThisDivision.length; y++) {
      if (
        JSON.parse(bouts[x].bottom_line_wrestler).name ==
        registrationInformationForThisDivision[y].id
      ) {
        theNewBoutsArray[
          x
        ].bottomLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
        theNewBoutsArray[x].bottomLineWrestlersActualTeamName =
          registrationInformationForThisDivision[y].team_name;
      }
      if (
        JSON.parse(bouts[x].top_line_wrestler).name ==
        registrationInformationForThisDivision[y].id
      ) {
        theNewBoutsArray[
          x
        ].topLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
        theNewBoutsArray[x].topLineWrestlersActualTeamName =
          registrationInformationForThisDivision[y].team_name;
      }
      if (JSON.parse(bouts[x].top_line_wrestler).name == "Bye") {
        theNewBoutsArray[x].topLineWrestlersActualName = "Bye";
        theNewBoutsArray[x].topLineWrestlersActualTeamName = "Bye";
      }
      if (JSON.parse(bouts[x].bottom_line_wrestler).name == "Bye") {
        theNewBoutsArray[x].bottomLineWrestlersActualName = "Bye";
        theNewBoutsArray[x].bottomLineWrestlersActualTeamName = "Bye";
      }
    }
  }
//   console.log({ theNewBoutsArray });
  return theNewBoutsArray;
};

export {
  addingActualNameAndActualTeamName,
};
