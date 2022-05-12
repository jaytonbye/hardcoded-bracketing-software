import React from "react";
import { useParams } from "react-router-dom";

export default function SubmitResult(props: any) {
  const [score, setScore] = React.useState("");

  //The purpose of current mat is so they don't accidentals dispatch a mat to no mans land.
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
    if (!selectedWinner) {
      alert("you must select a winner");
      return;
    }
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
        alert("it didn't work! Do you have the security clearance for this?");
      }
    });
  };

  let even = props.evenOdd % 2 === 0;
  let odd = props.evenOdd % 2 !== 0;

  let theEvenOddReturn = even ? "lightgray" : "orange";

  return (
    <>
      <div className="row mx-auto">
        <div className="p-2 my-1 row col-12  mx-auto" style={{ backgroundColor: theEvenOddReturn, borderRadius: "3px" }}>
          <div className="col-12 col-md-6">
            <p style={{ display: "inline", margin: "1px" }}>Bout ID: {boutID} ||</p>
            <p style={{ display: "inline", margin: "1px" }}> Match Number: {matchNumber} ||</p>
            <p style={{ display: "inline", margin: "1px" }}> Division ID: {divisionID} ||</p>
            <br />
            <h6 style={{ display: "inline", margin: "1px" }}> Select the winner: </h6>
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
            <h5 style={{ display: "inline", margin: "1px" }}>| |</h5>
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
          </div>
          <div className="col-12 col-md-6">
            <div className="m-1 p-1 col-12 col-md-6" style={{ display: "inline" }}>
              <label>Score: </label>
              <input type="text" onChange={onScoreChange} />
              <button onClick={submitResult} className="btn btn-sm btn-primary m-1">
                Submit Result
              </button>
            </div>
            <br />
            <div className="m-1 p-1 col-12 col-md-6" style={{ display: "inline" }}>
              <label>Move this bout to mat#: </label>
              <input type="number" onChange={onDispatchChange} />
              <button
                onClick={() => {
                  dispatchToMatFunction(boutID, matToDispatchTo);
                }}
                className="btn btn-sm btn-primary m-1"
              >
                Dispatch to Mat
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
