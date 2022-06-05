import React from "react";

//This function will get all of the bouts for a single division in a single event. If a bout has "bye" as a competitor name, it will run the results route.
export default function UpdateAllByes(props: any) {
  let eventID = props.eventID;
  let divisionID = props.divisionID;
  let userID = Number(sessionStorage.getItem("UID"));
  let token = sessionStorage.getItem("token");

  let submitResult = (
    boutID: number,
    loser: any,
    score: any,
    winner: any,
    matchNumber: any
  ) => {
    //This function will both submit the result (by updating the bout), but it will also update the 2 matches that are dependant upon these results.
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

  let handleClick = () => {
    fetch(`/api/bouts/boutsByEventAndDivision/${eventID}&${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        for (let x = 0; x < results.length; x++) {
          if (
            JSON.parse(results[x].top_line_wrestler).name === "bye" &&
            JSON.parse(results[x].bottom_line_wrestler).name === "bye"
          ) {
            submitResult(
              results[x].id,
              '{"name":"bye"}',
              "bye",
              '{"name":"bye"}',
              results[x].match_number
            );
          } else if (JSON.parse(results[x].top_line_wrestler).name === "bye") {
            submitResult(
              results[x].id,
              '{"name":"bye"}',
              "bye",
              results[x].bottom_line_wrestler,
              results[x].match_number
            );
          } else if (
            JSON.parse(results[x].bottom_line_wrestler).name === "bye"
          ) {
            submitResult(
              results[x].id,
              '{"name":"bye"}',
              "bye",
              results[x].top_line_wrestler,
              results[x].match_number
            );
          }
        }
        alert("say goodbye to your byes!");
      });
  };

  return (
    <>
      <button className="btn btn-primary ml-2 mt-2" onClick={handleClick}>
        Remove 1 round of byes
      </button>
    </>
  );
}
