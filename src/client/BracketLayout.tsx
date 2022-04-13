import React from "react";

export default function BracketLayout() {
  const [allBoutsFromDivision, setAllBoutsFromDivision] = React.useState([]);

  let eventID = 18; //hardcoded
  let divisionID = 45; //hardcoded
  React.useEffect(() => {
    fetch(`/api/bouts/boutsByEventAndDivision/${eventID}&${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        setAllBoutsFromDivision(results);
      });
  }, []);

  return (
    <>
      <h1>brackets go here:</h1>
    </>
  );
}
