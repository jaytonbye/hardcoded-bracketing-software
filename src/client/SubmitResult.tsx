import React from "react";
import bouts from "../server/db/bouts";
import { useParams } from "react-router-dom";

export default function SubmitResult(props: any) {
  const [score, setScore] = React.useState("");

  //The purpose of current mat is so they don't accidenatly dispatch a mat to no mans land.
  let currentMat = useParams<any>().matNumber;

  const [matToDispatchTo, setMatToDispatchTo] = React.useState(currentMat);
  const [selectedWinner, setSelectedWinner] = React.useState();

  let token = sessionStorage.getItem("token");

  let top_line_wrestler = JSON.parse(props.bout.top_line_wrestler);
  let bottom_line_wrestler = JSON.parse(props.bout.bottom_line_wrestler);
  let boutID = props.bout.id;
  let userID = Number(sessionStorage.getItem("UID"));
  let eventID = props.bout.event_id;
  let divisionID = props.bout.division_id;
  let matchNumber = props.bout.match_number;

  let submitResult = () => {
    //This function will both submit the result (by updating the bout), but it will also update the 2 matches that are dependant upon these results.
    let loser;
    if (selectedWinner === JSON.stringify(top_line_wrestler)) {
      loser = JSON.stringify(bottom_line_wrestler);
    }
    if (selectedWinner === JSON.stringify(bottom_line_wrestler)) {
      loser = JSON.stringify(top_line_wrestler);
    }
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
        alert("Result Submitted");
      } else {
        alert("It didn't submit the bout! Something is not working...");
      }
    });
  };
  let onScoreChange = (e: any) => {
    setScore(e.target.value);
  };

  let onDispatchChange = (e: any) => {
    setMatToDispatchTo(e.target.value);
  };

  let onWinnerClicked = (e: any) => {
    if (e.target.checked) {
    }
    setSelectedWinner(e.target.value);
    console.log(e);
  };

  let dispatchToMatFunction = (boutID: number, dispatchedToMat: number) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        boutID,
        dispatched: 1, //1 means true. 0 by default.
        dispatchedToMat,
        eventID,
      }),
    };
    fetch(`/api/bouts/dispatch`, requestOptions).then((res) => {
      if (res.ok) {
        alert(`The match was dispatched without a catch`);
      } else {
        alert("it didn't work! Blame Jason!");
      }
    });
  };

  return (
    <>
      <h4>Bout ID: {boutID}</h4>
      <h4>Match Number: {matchNumber}</h4>
      <h4>Division ID: {divisionID}</h4>
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

      <label>Move this bout to mat#: </label>
      <input type="number" onChange={onDispatchChange} />
      <button
        onClick={() => {
          dispatchToMatFunction(boutID, matToDispatchTo);
        }}
        className="btn btn-primary"
      >
        Dispatch to Mat
      </button>
    </>
  );
}
