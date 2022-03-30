import React from "react";

// @ts-ignore
import { dataFormatter } from "./bracketing_logic/dataFormatter";

// // @ts-ignore
// import { handleSeedingFunction } from "./bracketing_logic/handleSeedingFunction";

// @ts-ignore
import { seedingFunctionForUnlimitedCompetitors2 } from "./bracketing_logic/seedingFunctionForUnlimitedCompetitors2";
// @ts-ignore
import { bracketBuilder } from "./bracketing_logic/not_used/buildTheBrackets";

export default function AddCompetitorsComponent(props: any) {
  const [wrestlerList, setWrestlerList] = React.useState("");

  let onWrestlerListChange = (e: any) => {
    setWrestlerList(e.target.value);
  };

  let handleSubmitWrestlerList = () => {
    alert("The button was clicked");

    let formattedArrayOfWrestlersAndTeams = dataFormatter(wrestlerList);
    console.log({ formattedArrayOfWrestlersAndTeams });

    let seededArrayofWrestlersAndTeams = seedingFunctionForUnlimitedCompetitors2(
      formattedArrayOfWrestlersAndTeams
    );
    console.log({ seededArrayofWrestlersAndTeams });

    let brackets = bracketBuilder(seededArrayofWrestlersAndTeams);
    console.log({ brackets });

    //I'm not using state here. Is that ok?

    let token = sessionStorage.getItem("token");
    let userID = Number(sessionStorage.getItem("UID"));
    let eventID = props.eventID;
    let divisionID = props.divisionID;

    //creates individual matches out of the array
    for (let x = 0; x < brackets.length; x++) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          userID,
          eventID,
          divisionID,
          bottomLineWrestler: JSON.stringify(brackets[x].bottomLineWrestler),
          dispatched: brackets[x].dispatched,
          loser: brackets[x].loser,
          matchNumber: brackets[x].matchNumber,
          round: brackets[x].round,
          score: brackets[x].score,
          topLineWrestler: JSON.stringify(brackets[x].topLineWrestler),
          winner: brackets[x].winner,
          dispatchedToMat: null,
        }),
      };
      fetch("/api/bouts", requestOptions).then((res) => {
        if (res.ok) {
          console.log("bout added");
        } else {
          console.log("it didn't work!");
        }
      });
    }
  };

  return (
    <tr>
      <td colSpan={2}>
        <p>
          Copy and paste the full list of copmetitors and their teams into this
          text field. They should be "tab separated", which is the default way
          of copying and pasting from a spread sheet with 2 columns. They should
          also be in seed order, from top to bottom. The maximum bracket size is
          32 wrestlers. Here is a sample:{" "}
        </p>
      </td>
      <td colSpan={2}>
        <table className="table">
          <tbody className="bg-light">
            <tr>
              <td>Dan Gable</td>
              <td>Iowa</td>
            </tr>
            <tr>
              <td>Jason Layton</td>
              <td>Dynamic</td>
            </tr>
            <tr>
              <td>Cael Sanderson</td>
              <td>Penn State</td>
            </tr>
            <tr>
              <td>Hulk Hogan</td>
              <td>WWF</td>
            </tr>
            <tr>
              <td>Dana White</td>
              <td>UFC</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <label>Paste Wrestler List for this division</label>
        <textarea className="ml-2" onChange={onWrestlerListChange} />
      </td>
      <td>
        <button
          className="btn btn-primary ml-2"
          onClick={() => handleSubmitWrestlerList()}
        >
          Submit Wrestler List and Make the Brackets!
        </button>
      </td>
    </tr>
  );
}
