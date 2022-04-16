import React from "react";

//This function will get all of the bouts for a single division in a single event. If a bout has "bye" as a competitor name, it will run the results route.
export default function UpdateAllByes() {
  let eventID = 20; //hardcoded
  let divisionID = 52; //hardcoded

  let handleClick = () => {
    fetch(`/boutsByEventAndDivision/${eventID}&${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
      });
  };

  return (
    <>
      <h1>here is it?:IOJ</h1>
      <button onClick={handleClick}>Remove all Byes</button>
    </>
  );
}
//wtf
