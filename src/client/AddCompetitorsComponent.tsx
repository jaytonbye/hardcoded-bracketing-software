import React from "react";

// @ts-ignore
import { dataFormatter } from "./bracketing_logic/bracketBuilder";
// // @ts-ignore
// import { handleSeedingFunction } from "./bracketing_logic/bracketBuilder";
// // @ts-ignore
// import { bracketBuilder } from "./bracketing_logic/bracketBuilder";

export default function AddCompetitorsComponent() {
  const [wrestlerList, setWrestlerList] = React.useState("");

  let divisionID = 25;

  let onWrestlerListChange = (e: any) => {
    setWrestlerList(e.target.value);
  };

  let handleSubmitWrestlerList = () => {
    alert("The button was clicked");

    // formattedArrayOfWrestlersAndTeams = dataFormatter(wrestlerList);
    // let seededArrayofWrestlersAndTeams = handleSeedingFunction(
    //   formattedArrayOfWrestlersAndTeams
    // );
    // bracketBuilder(seededArrayofWrestlersAndTeams);
  };

  return (
    <>
      <h2>
        Copy and paste the full list of copmetitors and there teams into this
        text field. They should be "tab separated", which is the default way of
        copying and pasting from a spread sheet with 2 columns. They should also
        be in seed order, from top to bottom. The maximum bracket size is 32
        wrestlers. Here is a sample:{" "}
      </h2>
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
      <h3>Division Label:</h3>
      <label>Paste Wrestler List for this division</label>
      <textarea className="ml-2" onChange={onWrestlerListChange} />
      <button
        className="btn btn-primary ml-2"
        onClick={() => handleSubmitWrestlerList()}
      >
        Submit Wrestler List and Make the Brackets!
      </button>
    </>
  );
}
