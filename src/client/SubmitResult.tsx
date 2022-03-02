import React from "react";

export default function SubmitResult(props: any) {
  const [score, setScore] = React.useState("");

  let token = sessionStorage.getItem("token");

  let submitResult = () => {
    //This function will both submit the result (by updating the bout), but it will also update the 2 matches that are dependant upon these results.

    let boutID = 949; //hardcoded
    let userID = 1; //hardcoded
    let loser = JSON.stringify({
      name: "Wrestler Seeded24",
      team: "Team 24",
      seed: 24,
    }); //hardcoded
    let score = "3-2"; //hardcoded
    let winner = JSON.stringify({
      name: "Wrestler Seeded9",
      team: "Team 9",
      seed: 9,
    }); //hardcoded
    let eventID = 7; //hardcoded
    let divisionID = 24; //hardcoded
    let matchNumber = 4; //hardcoded

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

  return (
    <>
      <h1>Select the winner:</h1>
      <label>Wrestler 1 Name goes here:</label>
      <input type="radio" value="the value will go here" />
      <br />
      <label>Wrestler 2 Name goes here</label>
      <input type="radio" value="the value will go here" />
      <br />
      <label>Score: </label>
      <input type="text" onChange={onScoreChange} />
      <button onClick={submitResult} className="btn btn-primary">
        Submit Result
      </button>
    </>
  );
}
