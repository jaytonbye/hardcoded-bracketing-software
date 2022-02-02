import React from "react";

export default function DisplayBracket(props: any) {
  const [bouts, setBouts] = React.useState([]);

  let eventID = props.eventID;
  let divisionID = props.divisionID;

  React.useEffect(() => {
    fetch(`/api/bouts/boutsByEventAndDivision/${eventID}&${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        setBouts(results);
      });
  }, []);

  let dispatchToMatFunction = () => {
    alert("it doesn't work yet...");
  };

  let editBout = () => {
    alert("this feature doesn't work yet...");
  };

  return (
    <>
      <h3>Brackets go here:</h3>
      {bouts.map((bout) => {
        return (
          <div key={bout.id}>
            <h4>Match #: {bout.match_number}</h4>
            <h4>Round #: {bout.round}</h4>
            <h4>{JSON.parse(bout.top_line_wrestler).name}</h4>
            <h5>VS</h5>
            <h4>{JSON.parse(bout.bottom_line_wrestler).name}</h4>
            <h4>{bout.dispatched_to_mat}</h4>
            <h4>{bout.score}</h4>
            <label>Dispatch this match to mat number: </label>
            <input type="number" />
            <button
              className="btn btn-secondary"
              onClick={dispatchToMatFunction}
            >
              Dispatch!
            </button>
            <button className="btn btn-danger" onClick={editBout}>
              Edit Bout
            </button>
          </div>
        );
      })}
    </>
  );
}
