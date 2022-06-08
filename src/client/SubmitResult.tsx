import React from "react";
import { Route } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import SingleMatPage from "./SingleMatPage";

export default function SubmitResult(props: any) {
  // console.log(!props.boolUsedOnlyForReRenderingThisComponent)
  const [score, setScore] = React.useState("");

  //The purpose of current mat is so they don't accidentals dispatch a mat to no mans land.
  let currentMat = useParams<any>().matNumber;
  const history = useHistory()

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
    let areYouSureResultsAreCorrect = confirm(
      `Are you sure ${JSON.parse(selectedWinner).name} from ${JSON.parse(selectedWinner).team
      } was the winner?`
    );
    if (areYouSureResultsAreCorrect) {
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
          // !props.boolUsedOnlyForReRenderingThisComponent === false
          //   ? props.boolUsedOnlyForReRenderingThisComponent(true)
          //   : props.boolUsedOnlyForReRenderingThisComponent(false);
          history.go(0)
          // <Route path={"/"}/>
        } else {
          alert("It didn't submit the bout! Something is not working...");
        }
      });
    } else {
      return;
    }
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
        // props.boolUsedOnlyForReRenderingThisComponent(!props.boolUsedOnlyForReRenderingThisComponent)
        // !props.boolUsedOnlyForReRenderingThisComponent === false
        //   ? props.boolUsedOnlyForReRenderingThisComponent(true)
        //   : props.boolUsedOnlyForReRenderingThisComponent(false);
        history.go(0)
        // window.location.reload();
        // <Route path={"/"} component={SingleMatPage}/>
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
        <div
          className="p-2 my-1 row col-12  mx-auto"
          style={{ backgroundColor: theEvenOddReturn, borderRadius: "3px" }}
        >
          <div className=" col-sm-6 col-12">
            <p style={{ display: "inline", margin: "1px" }}>
              Bout ID: {boutID}{" "}
            </p>
            <p style={{ display: "inline", margin: "1px" }}>
              {" "}
              Match Number: {matchNumber}{" "}
            </p>
            <p style={{ display: "inline", margin: "1px" }}>
              {" "}
              Division ID: {divisionID}{" "}
            </p>
            <br />
            <h6 style={{ display: "inline", margin: "1px" }}>
              {" "}
              Select the winner:{" "}
            </h6>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={<><strong>Name:</strong> {top_line_wrestler.name}{" "}
                <strong>Team:</strong> {top_line_wrestler.team}</>}
              value={JSON.stringify(top_line_wrestler)}
              checked={selectedWinner == JSON.stringify(top_line_wrestler)}
              onChange={onWinnerClicked}
            >

            </Form.Check>
            <Form.Check
              type="switch"
              id="custom-switch-2"
              label={<><strong>Name:</strong> {bottom_line_wrestler.name}{" "}
                <strong>Team:</strong> {bottom_line_wrestler.team}</>}
              value={JSON.stringify(bottom_line_wrestler)}
              checked={selectedWinner == JSON.stringify(bottom_line_wrestler)}
              onChange={onWinnerClicked}
            >

            </Form.Check>
            {/* <input
              className="form-check-input"
              type="radio"
              value={JSON.stringify(top_line_wrestler)}
              checked={selectedWinner == JSON.stringify(top_line_wrestler)}
              onChange={onWinnerClicked}
            />
            <label className="form-check-label">
              <strong>Name:</strong> {bottom_line_wrestler.name}{" "}
              <strong>Team:</strong> {bottom_line_wrestler.team}
            </label>

            <input
              type="radio"
              value={JSON.stringify(bottom_line_wrestler)}
              checked={selectedWinner == JSON.stringify(bottom_line_wrestler)}
              onChange={onWinnerClicked}
            /> */}
          </div>
          <div className=" col-sm-6 col-12">
            <div className="m-1 p-1 col-md-6" style={{ display: "inline" }}>
              <label>Score: </label>
              <input className="col-sm-2 col-12" type="text" onChange={onScoreChange} />
              <button
                onClick={submitResult}
                className="btn btn-sm btn-primary m-1"
              >
                Submit Result
              </button>
            </div>
            <br />
            <div className="m-1 p-1 col-md-6" style={{ display: "inline" }}>
              <label>Move this bout to mat#: </label>
              <input
                className="col-sm-2 col-12"
                type="number"
                onChange={onDispatchChange}
              />
              <button
                onClick={() => {
                  let areYouSureYouWantToMoveMats = confirm(
                    `Are your sure you want to move this bout to mat: ${matToDispatchTo}`
                  );
                  if (areYouSureYouWantToMoveMats) {
                    dispatchToMatFunction(boutID, matToDispatchTo);
                  } else {
                    return;
                  }
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
