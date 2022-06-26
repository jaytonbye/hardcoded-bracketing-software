import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import SingleMatPage from "./SingleMatPage";
import { ISingleBoutInfoAfterPutThroughFuncforActualNames } from "./services/interfaces";
import * as bracketingFunctions from "./services/BracketsFunctions";
import * as twilioFunctions from "./services/TwilioFunctions";

export default function SubmitResult(props: any) {
  // console.log(!props.boolUsedOnlyForReRenderingThisComponent)
  const [score, setScore] = React.useState("");

  //The purpose of current mat is so they don't accidentals dispatch a mat to no mans land.
  let currentMat = useParams<any>().matNumber;
  const [matToDispatchTo, setMatToDispatchTo] = React.useState(currentMat);
  const [selectedWinner, setSelectedWinner] = React.useState<any>();
  const [winnerActualName, setWinnerActualName] = React.useState<
    string | any
  >();
  const [loserActualName, setLoserActualName] = React.useState<string | any>();
  const [loserToParse, setLoserToParse] = React.useState<any>();
  const [
    registrationInformationForThisDivision,
    setRegistrationInformationForThisDivision,
  ] = React.useState<any>();
  const [bouts2, setBouts2] = React.useState<
    any[] | any | ISingleBoutInfoAfterPutThroughFuncforActualNames[]
  >();
  let token = sessionStorage.getItem("token");

  let bout = props.bout;
  let top_line_wrestler = JSON.parse(props.bout.top_line_wrestler);
  let bottom_line_wrestler = JSON.parse(props.bout.bottom_line_wrestler);
  let boutID = props.bout.id;
  let userID = Number(sessionStorage.getItem("UID"));
  let eventID = props.bout.event_id;
  let divisionID = props.bout.division_id;
  let matchNumber = props.bout.match_number;

  // React.useEffect(() => {
  //   fetch(`/api/bouts/boutsByEventAndDivision/${eventID}/${divisionID}`)
  //     .then((res) => res.json())
  //     .then((results) => {
  //       setBouts(results);
  //     });
  // }, []);

  React.useEffect(() => {
    if (props.bout) {
      fetch(
        `/api/registrations/getNameAndTeamNameOnly/${eventID}/${divisionID}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRegistrationInformationForThisDivision(res);
        });
    }
  }, [props.bout]);

  React.useEffect(() => {
    if (registrationInformationForThisDivision && props.bout) {
      // console.log("#####");
      // console.log(props.bout);
      // console.log(registrationInformationForThisDivision);
      let theNewBoutsArray =
        bracketingFunctions.addingActualNameAndActualTeamName(
          [props.bout],
          registrationInformationForThisDivision
        );
      setBouts2(theNewBoutsArray);
    }
  }, [registrationInformationForThisDivision, props.bout]);

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
      `Are you sure ${selectedWinner} was the winner?`
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
          //twilio
          twilioFunctions.resultsMessage(
            JSON.parse(selectedWinner).name,
            winnerActualName,
            loserActualName
          );
          twilioFunctions.resultsMessage(
            JSON.parse(loserToParse).name,
            winnerActualName,
            loserActualName
          );
          props.rerenderFunc();
          // !props.boolUsedOnlyForReRenderingThisComponent === false
          //   ? props.boolUsedOnlyForReRenderingThisComponent(true)
          //   : props.boolUsedOnlyForReRenderingThisComponent(false);
          // history.go(0);
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
    // console.log(e.target.value);
    // console.log(JSON.stringify(top_line_wrestler));
    if (e.target.value === JSON.stringify(top_line_wrestler)) {
      setLoserToParse(JSON.stringify(bottom_line_wrestler));
      setWinnerActualName(bouts2[0].topLineWrestlersActualName);
      setLoserActualName(bouts2[0].bottomLineWrestlersActualName);
    } else {
      setLoserToParse(JSON.stringify(top_line_wrestler));
      setWinnerActualName(bouts2[0].bottomLineWrestlersActualName);
      setLoserActualName(bouts2[0].topLineWrestlersActualName);
    }
    // console.log(e.target.value)
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
        twilioFunctions.dispatchedToMatMessage(
          JSON.parse(bout.top_line_wrestler).name,
          matToDispatchTo,
          bouts2[0].topLineWrestlersActualName,
          bouts2[0].bottomLineWrestlersActualName
        );
        twilioFunctions.dispatchedToMatMessage(
          JSON.parse(bout.bottom_line_wrestler).name,
          matToDispatchTo,
          bouts2[0].topLineWrestlersActualName,
          bouts2[0].bottomLineWrestlersActualName
        );
        props.rerenderFunc();
        // props.boolUsedOnlyForReRenderingThisComponent(!props.boolUsedOnlyForReRenderingThisComponent)
        // !props.boolUsedOnlyForReRenderingThisComponent === false
        //   ? props.boolUsedOnlyForReRenderingThisComponent(true)
        //   : props.boolUsedOnlyForReRenderingThisComponent(false);
        // history.go(0);
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
  if (bouts2) {
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
                type="radio"
                id="custom-switch"
                label={
                  <>
                    <strong>Name:</strong>{" "}
                    {bouts2[0].topLineWrestlersActualName}{" "}
                    <strong>Team:</strong>{" "}
                    {bouts2[0].topLineWrestlersActualTeamName}
                  </>
                }
                value={JSON.stringify(top_line_wrestler)}
                checked={selectedWinner == JSON.stringify(top_line_wrestler)}
                onChange={onWinnerClicked}
              ></Form.Check>
              <Form.Check
                type="radio"
                id="custom-switch-2"
                label={
                  <>
                    <strong>Name:</strong>{" "}
                    {bouts2[0].bottomLineWrestlersActualName}{" "}
                    <strong>Team:</strong>{" "}
                    {bouts2[0].bottomLineWrestlersActualTeamName}
                  </>
                }
                value={JSON.stringify(bottom_line_wrestler)}
                checked={selectedWinner == JSON.stringify(bottom_line_wrestler)}
                onChange={onWinnerClicked}
              ></Form.Check>
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
                <input
                  className="col-sm-2 col-12"
                  type="text"
                  onChange={onScoreChange}
                />
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
  } else {
    return <p>Loading...</p>;
  }
}
