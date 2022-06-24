import React from "react";

// @ts-ignore
import { dataFormatter } from "./bracketing_logic/dataFormatter";

// @ts-ignore
import { makeBracketHave32Competitors } from "./bracketing_logic/makeBracketHave32Competitors";

// @ts-ignore
import { seedingFunctionForUnlimitedCompetitors2 } from "./bracketing_logic/seedingFunctionForUnlimitedCompetitors2";

// @ts-ignore
import { bracketBuilder } from "./bracketing_logic/buildTheBrackets";

// @ts-ignore
import { roundRobinBuilder } from "./bracketing_logic/roundRobinBuilder.ts";
import EditAllWrestlersInEvent from "./EditAllWrestlersInEvent";

export default function AddCompetitorsComponent(props: IProps) {
  const [wrestlerList, setWrestlerList] = React.useState("");

  let token = sessionStorage.getItem("token");
  let userID = Number(sessionStorage.getItem("UID"));
  let eventID: string | number = props.eventID;
  let divisionID: string | number | any = props.divisionID;

  let labelBracketTypeInDatabase = (
    bracketType: string,
    divisionID: number
  ) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        bracketType,
        divisionID,
      }),
    };
    fetch("/api/divisions", requestOptions).then((res) => {
      if (res.ok) {
        console.log("bracket type updated");
      } else {
        console.log("it didn't work!");
      }
    });
  };

  let onWrestlerListChange = (e: any) => {
    setWrestlerList(e.target.value);
  };

  let handleSubmitWrestlerListFor32ManBracket = () => {
    labelBracketTypeInDatabase("double-elimination", divisionID);

    let formattedArrayOfWrestlersAndTeams = makeBracketHave32Competitors(
      dataFormatter(wrestlerList)
    );
    console.log({ formattedArrayOfWrestlersAndTeams });

    let seededArrayofWrestlersAndTeams = seedingFunctionForUnlimitedCompetitors2(
      formattedArrayOfWrestlersAndTeams
    );
    console.log({ seededArrayofWrestlersAndTeams });

    let brackets = bracketBuilder(seededArrayofWrestlersAndTeams);
    console.log({ brackets });

    //I'm not using state here. Is that ok?

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
    alert("The button was clicked. A better alert message should be used.");
  };

  let handleSubmitWrestlerListForRoundRobinBracket = () => {
    labelBracketTypeInDatabase("round-robin", divisionID);

    let formattedArrayOfWrestlersAndTeams = dataFormatter(wrestlerList);

    console.log({ formattedArrayOfWrestlersAndTeams });

    let roundRobinBrackets = roundRobinBuilder(
      formattedArrayOfWrestlersAndTeams
    );
    console.log(roundRobinBrackets);

    //creates individual matches out of the array
    for (let x = 0; x < roundRobinBrackets.length; x++) {
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
          bottomLineWrestler: JSON.stringify(
            roundRobinBrackets[x].bottomLineWrestler
          ),
          dispatched: roundRobinBrackets[x].dispatched,
          loser: roundRobinBrackets[x].loser,
          matchNumber: roundRobinBrackets[x].matchNumber,
          round: roundRobinBrackets[x].round,
          score: roundRobinBrackets[x].score,
          topLineWrestler: JSON.stringify(
            roundRobinBrackets[x].topLineWrestler
          ),
          winner: roundRobinBrackets[x].winner,
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
    alert("The button was clicked. A better alert message should be used.");
  };

  return (
    <>
      <div>
        {
          <EditAllWrestlersInEvent
            eventID={props.eventID}
            divisionID={props.divisionID}
          />
        }
      </div>
      {/* ////////////////////////////////////// */}
      <tr>
        <td colSpan={1}>
          <p>
            Copy and paste the full list of copmetitors and their teams into
            this text field. They should be "tab separated", which is the
            default way of copying and pasting from a spread sheet with 2
            columns. They will be in seed order, from top to bottom. The maximum
            bracket size is 32 wrestlers. Here is a sample:{" "}
          </p>
        </td>
        <td colSpan={1}>
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
            onClick={() => handleSubmitWrestlerListFor32ManBracket()}
          >
            Click this button to make a 32 Bracket!
          </button>
          <p>or</p>
          <button
            className="btn btn-primary ml-2"
            onClick={() => handleSubmitWrestlerListForRoundRobinBracket()}
          >
            Click this button to make a round-robin bracket!
          </button>
        </td>
      </tr>
    </>
  );
}

interface IProps {
  divisionID: string | number;
  eventID: string | number;
}
