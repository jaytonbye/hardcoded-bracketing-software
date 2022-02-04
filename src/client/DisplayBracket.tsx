import React from "react";

export default function DisplayBracket(props: any) {
  const [bouts, setBouts] = React.useState([]);
  const [dispatchToMat, setDispatchToMat] = React.useState();

  let eventID = props.eventID;
  let divisionID = props.divisionID;

  React.useEffect(() => {
    fetch(`/api/bouts/boutsByEventAndDivision/${eventID}&${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        setBouts(results);
      });
  }, []);

  let onDispatchToMatChange = (e: any) => {
    setDispatchToMat(e.target.value);
  };

  let dispatchToMatFunction = (boutID: number, dispatchedToMat: number) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        boutID,
        dispatched: 1, //1 means true. 0 by default.
        dispatchedToMat,
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

  let editBout = () => {
    alert(
      "this is currently hardcoded with made up values, it is waiting on a modal"
    );
    //hardcoded
    let bottomLineWrestlerName = "Turd McDuckin";
    let bottomLineWrestlerTeam = "quacky jacks";
    let bottomLineWrestlerSeed = 17;
    let topLineWrestlerName = "Your mom is a donkey";
    let topLineWrestlerTeam = "donkey doooos";
    let topLineWrestlerSeed = 10000;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        //hardcoded
        boutID: 203,
        userID: 1,
        bottomLineWrestler: JSON.stringify({
          name: bottomLineWrestlerName,
          team: bottomLineWrestlerTeam,
          seed: bottomLineWrestlerSeed,
        }),
        dispatched: true,
        loser: "you",
        score: "infinity to negative infinity",
        topLineWrestler: JSON.stringify({
          name: topLineWrestlerName,
          team: topLineWrestlerTeam,
          seed: topLineWrestlerSeed,
        }),
        winner: "me",
        dispatchedToMat: 2,
      }),
    };
    fetch(`/api/bouts/`, requestOptions).then((res) => {
      if (res.ok) {
        alert(
          `The changes you requested have been magically completed via the power of the internet. Voila!`
        );
      } else {
        alert("it didn't work! Blame Jason!");
      }
    });
  };

  return (
    <>
      <h3>Brackets go here:</h3>
      {bouts.map((bout) => {
        return (
          <div key={bout.id}>
            <h4>Match #: {bout.match_number}</h4>
            <h4>Round #: {bout.round}</h4>
            <h4>
              Top Wrestler's Name: {JSON.parse(bout.top_line_wrestler).name}
            </h4>
            <h5>
              Top Wrestler's Team: {JSON.parse(bout.top_line_wrestler).team}
            </h5>
            <h5>VS</h5>
            <h4>
              Bottom Wrestler's Name:{" "}
              {JSON.parse(bout.bottom_line_wrestler).name}
            </h4>
            <h5>
              Bottom Wrestler's Team:{" "}
              {JSON.parse(bout.bottom_line_wrestler).team}
            </h5>
            <h4>Dispatched to mat #: {bout.dispatched_to_mat}</h4>
            <h4>Score: {bout.score}</h4>
            <label>Dispatch this match to mat number: </label>
            <input type="number" onChange={onDispatchToMatChange} />
            <button
              className="btn btn-secondary"
              onClick={() => {
                dispatchToMatFunction(bout.id, dispatchToMat);
              }}
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
