import React from "react";
import { Card, Button } from 'react-bootstrap';
import classNames from 'classnames';



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
        const cardClasses = classNames("my-2", "mx-1", { "the-card-border": bout.id % 2 === 0, "the-card-border-black": bout.id % 2 !== 0 })
        return (
          <>
            <Card key={bout.id} style={{ width: '50rem' }} className={cardClasses}>
              <Card.Body>
                <Card.Title style={{ textDecoration: "underline" }}><h3>Match #: {bout.match_number}</h3></Card.Title>
                <Card.Subtitle className="mb-3" style={{ borderBottom: "2px solid black" }}><h4>Round #: {bout.round}</h4></Card.Subtitle>
                <Card.Text className="display-4 font-weight-bold" style={{ fontSize: "1.5em" }}>
                  Top Wrestler's Name: {JSON.parse(bout.top_line_wrestler).name}
                </Card.Text>
                <Card.Text className="text-muted">
                  Top Wrestler's Team: {JSON.parse(bout.top_line_wrestler).team}
                </Card.Text>
              </Card.Body>
              <hr />
              <Card.Body>
                <Card.Text className="display-4 font-weight-bold" style={{ fontSize: "1.5em" }}>
                  Bottom Wrestler's Name: {JSON.parse(bout.bottom_line_wrestler).name}
                </Card.Text>
                <Card.Text className="text-muted">
                  Top Wrestler's Team: {JSON.parse(bout.bottom_line_wrestler).team}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <em>
                  <h4>Dispatched to mat #: {bout.dispatched_to_mat}</h4>
                </em>
                <h4>Score: {bout.score}</h4>
                <div>
                  <label>Dispatch this match to mat number: </label>
                  <input type="number" className="ml-2" onChange={onDispatchToMatChange} />
                </div>

                <div className="d-flex justify-content-evenly">
                  <Button variant="secondary" onClick={editBout}>
                    Edit Bout
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatchToMatFunction(bout.id, dispatchToMat);
                    }}
                  >
                    Dispatch!
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </>
        );
      })}
    </>
  );
}
