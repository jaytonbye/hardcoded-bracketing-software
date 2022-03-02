import React from "react";
import bouts from "../server/db/bouts";

export default function SubmitResult(props: any) {
  const [score, setScore] = React.useState("");
  const [selectedWinner, setSelectedWinner] = React.useState();

  let token = sessionStorage.getItem("token");

  let top_line_wrestler = JSON.parse(props.bout.top_line_wrestler);
  let bottom_line_wrestler = JSON.parse(props.bout.bottom_line_wrestler);
  let boutID = props.bout.id;
  let userID = 1; //hardcoded
  let eventID = props.bout.event_id;
  let divisionID = props.bout.division_id;
  let matchNumber = props.bout.match_number;

  console.log({ top_line_wrestler });
  let submitResult = () => {
    //This function will both submit the result (by updating the bout), but it will also update the 2 matches that are dependant upon these results.
    let loser;
    if (selectedWinner === JSON.stringify(top_line_wrestler)) {
      loser = JSON.stringify(bottom_line_wrestler);
    }
    if (selectedWinner === JSON.stringify(bottom_line_wrestler)) {
      loser = JSON.stringify(top_line_wrestler);
    }
    // let loser = JSON.stringify({
    //   name: "Wrestler Seeded24",
    //   team: "Team 24",
    //   seed: 24,
    // }); //hardcoded
    console.log({ loser });

    let winner = selectedWinner;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        boutID,
        userID,
        loser,
        score,
        winner,
        eventID,
        divisionID,
        matchNumber,
      }),
    };
    fetch("/api/bouts/result", requestOptions).then((res) => {
      if (res.ok) {
        console.log("Result Submitted");
      } else {
        console.log("It didn't submit the bout! Something is not working...");
      }
    });
  };
  let onScoreChange = (e: any) => {
    setScore(e.target.value);
  };

  let onWinnerClicked = (e: any) => {
    if (e.target.checked) {
    }
    setSelectedWinner(e.target.value);
    console.log(e);
  };

  let dispatchToMat = () => {
    alert("have not set this up yet");
  };

  return (
    <>
      <h4>Bout ID: {boutID}</h4>
      <h4>Match Number: {matchNumber}</h4>
      <h4>Select the winner:</h4>
      <label>
        <strong>Name:</strong> {top_line_wrestler.name} <strong>Team:</strong>{" "}
        {top_line_wrestler.team}
      </label>
      <input
        type="radio"
        value={JSON.stringify(top_line_wrestler)}
        checked={selectedWinner == JSON.stringify(top_line_wrestler)}
        onChange={onWinnerClicked}
      />
      <br />
      <label>
        <strong>Name:</strong> {bottom_line_wrestler.name}{" "}
        <strong>Team:</strong> {bottom_line_wrestler.team}
      </label>
      <input
        type="radio"
        value={JSON.stringify(bottom_line_wrestler)}
        checked={selectedWinner == JSON.stringify(bottom_line_wrestler)}
        onChange={onWinnerClicked}
      />
      <br />
      <label>Score: </label>
      <input type="text" onChange={onScoreChange} />
      <button onClick={submitResult} className="btn btn-primary">
        Submit Result
      </button>

      {/*Do we want to give these scrubs permission to move matches to different mats?*/}
      <label>Send this bout to mat#: </label>
      <input type="number" onChange={onScoreChange} />
      <button onClick={dispatchToMat} className="btn btn-primary">
        Dispatch to Mat
      </button>
    </>
  );
}
