import { ConnectionPolicyContext } from "twilio/lib/rest/voice/v1/connectionPolicy";
import { convertCompilerOptionsFromJson } from "typescript";

let addingActualNameAndActualTeamName = (
  bouts: any,
  registrationInformationForThisDivision: any
) => {
  console.log({ bouts });
  console.log({ registrationInformationForThisDivision });
  let theNewBoutsArray: any = [];

  for (let x = 0; x < bouts.length; x++) {
    theNewBoutsArray.push({
      ...bouts[x],
    });

    theNewBoutsArray[x].topLineWrestlersActualName = JSON.parse(
      bouts[x].top_line_wrestler
    ).name;

    theNewBoutsArray[x].bottomLineWrestlersActualName = JSON.parse(
      bouts[x].bottom_line_wrestler
    ).name;

    //Harry is not happy that we did this, but it works. ~Spaghet ~IDIOT
    for (let y = 0; y < registrationInformationForThisDivision.length; y++) {
      if (JSON.parse(bouts[x].top_line_wrestler).name == "bye") {
        theNewBoutsArray[x].topLineWrestlersActualName = "bye";
        theNewBoutsArray[x].topLineWrestlersActualTeamName = "bye";
      } else if (
        JSON.parse(bouts[x].top_line_wrestler).name ==
        registrationInformationForThisDivision[y].id
      ) {
        theNewBoutsArray[
          x
        ].topLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
        theNewBoutsArray[x].topLineWrestlersActualTeamName =
          registrationInformationForThisDivision[y].team_name;
      } else {
      }

      if (JSON.parse(bouts[x].bottom_line_wrestler).name == "bye") {
        theNewBoutsArray[x].bottomLineWrestlersActualName = "bye";
        theNewBoutsArray[x].bottomLineWrestlersActualTeamName = "bye";
      } else if (
        JSON.parse(bouts[x].bottom_line_wrestler).name ==
        registrationInformationForThisDivision[y].id
      ) {
        theNewBoutsArray[
          x
        ].bottomLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
        theNewBoutsArray[x].bottomLineWrestlersActualTeamName =
          registrationInformationForThisDivision[y].team_name;
      } else {
      }
    }
  }
  return theNewBoutsArray;
};

export { addingActualNameAndActualTeamName };
