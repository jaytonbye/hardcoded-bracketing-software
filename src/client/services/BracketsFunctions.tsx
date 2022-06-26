import { ConnectionPolicyContext } from "twilio/lib/rest/voice/v1/connectionPolicy";
import { convertCompilerOptionsFromJson } from "typescript";

let addingActualNameAndActualTeamName = (
  bouts: any,
  registrationInformationForThisDivision: any
) => {
  console.log({ bouts });
  console.log({ registrationInformationForThisDivision });
  let theNewBoutsArray: any = [];
  console.log("for loop begins");
  for (let x = 0; x < bouts.length; x++) {
    theNewBoutsArray.push({
      ...bouts[x],
    });

    //Harry is not happy that we did this, but it works. ~Spaghet
    for (let y = 0; y < registrationInformationForThisDivision.length; y++) {
      if (JSON.parse(bouts[x].top_line_wrestler).name == "bye") {
        theNewBoutsArray[x].topLineWrestlersActualName = "bye";
        theNewBoutsArray[x].topLineWrestlersActualTeamName = "bye";
      } else {
        theNewBoutsArray[x].topLineWrestlersActualName = JSON.parse(
          bouts[x].top_line_wrestler
        ).name;
      }
      if (JSON.parse(bouts[x].bottom_line_wrestler).name == "bye") {
        theNewBoutsArray[x].bottomLineWrestlersActualName = "bye";
        theNewBoutsArray[x].bottomLineWrestlersActualTeamName = "bye";
      } else {
        theNewBoutsArray[x].bottomLineWrestlersActualName = JSON.parse(
          bouts[x].bottom_line_wrestler
        ).name;
      }
      if (
        JSON.parse(bouts[x].bottom_line_wrestler).name ==
        registrationInformationForThisDivision[y].id
      ) {
        console.log("here1")
        theNewBoutsArray[
          x
        ].bottomLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
        theNewBoutsArray[x].bottomLineWrestlersActualTeamName =
          registrationInformationForThisDivision[y].team_name;
      }
    //         console.log(JSON.parse(bouts[x].top_line_wrestler).name)
    //   console.log(registrationInformationForThisDivision[y].id)
      if (
        JSON.parse(bouts[x].top_line_wrestler).name ==
        registrationInformationForThisDivision[y].id
      ) {
        // console.log("here2")
        // console.log(registrationInformationForThisDivision[y].id)
        // console.log(registrationInformationForThisDivision[y].first_name)
        // console.log(registrationInformationForThisDivision[y].last_name)
        // // console.log(theNewBoutsArray[x].topLineWrestlersActualTeamName)
        // console.log(registrationInformationForThisDivision[y].team_name)
        // registrationInformationForThisDivision[y].last_name
        let poop = []
        theNewBoutsArray[
          x
        ].topLineWrestlersActualName = `hi`;
        theNewBoutsArray[x].topLineWrestlersActualTeamName =
          registrationInformationForThisDivision[y].team_name;
      }
    }
  }
    // console.log({ theNewBoutsArray });
  return theNewBoutsArray;
};

export { addingActualNameAndActualTeamName };
