import React from "react";
import { Card, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ModalForDisplayBrackets from "./ModalForDisplayBrackets";

export default function SingleBoutForDisplayBracket(props: any) {
  const [dispatchToMat, setDispatchToMat] = React.useState();
  const [modalShow, setModalShow] = React.useState<any>({});

  let token = sessionStorage.getItem("token");
  let eventID = props.eventID;
  let index = props.index; //wtf is wc doing here?
  let bouts = props.bouts; //are we passing too much?

  let bout = props.bout;

  let onDispatchToMatChange = (e: any) => {
    setDispatchToMat(e.target.value);
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
        alert("it didn't work! You likely don't have the security clearance!");
      }
    });
  };

  let showEditBout = (e: any) => {
    setModalShow((prev: {}) => {
      return { ...prev, [e.target.name]: !modalShow[e.target.name] };
    });
  };

  return (
    <>
      <>
        <Card key={`Bout ID:${bout.id}`}>
          <Card.Body>
            <Card.Title style={{ textDecoration: "underline" }}>
              <h3>Match #: {bout.match_number}</h3>
            </Card.Title>
            <Card.Subtitle
              className="mb-3"
              style={{ borderBottom: "2px solid black" }}
            >
              <h4>Round #: {bout.round}</h4>
            </Card.Subtitle>
            <Card.Text
              className="display-4 font-weight-bold"
              style={{ fontSize: "1.5em" }}
            >
              Top Wrestler's Name: {JSON.parse(bout.top_line_wrestler).name}
            </Card.Text>
            <Card.Text className="text-muted">
              Top Wrestler's Team: {JSON.parse(bout.top_line_wrestler).team}
            </Card.Text>
          </Card.Body>
          <hr />
          <Card.Body>
            <Card.Text
              className="display-4 font-weight-bold"
              style={{ fontSize: "1.5em" }}
            >
              Bottom Wrestler's Name:{" "}
              {JSON.parse(bout.bottom_line_wrestler).name}
            </Card.Text>
            <Card.Text className="text-muted">
              Top Wrestler's Team: {JSON.parse(bout.bottom_line_wrestler).team}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <em>
              <h4>
                Dispatched to mat #:{" "}
                <Link to={`/events/${eventID}/mat/${bout.dispatched_to_mat}`}>
                  {bout.dispatched_to_mat}
                </Link>
              </h4>
            </em>
            <h4>Score: {bout.score}</h4>
            <div>
              <label>Dispatch this match to mat number: </label>
              <input
                type="number"
                className="mb-2 ml-2"
                onChange={onDispatchToMatChange}
              />
            </div>

            <div className="d-flex justify-content-evenly">
              <Button
                variant="secondary"
                name={String(bout.id)}
                onClick={showEditBout}
              >
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
            {modalShow[bout.id] && (
              <ModalForDisplayBrackets index={index} bouts={bouts} />
            )}
          </Card.Footer>
        </Card>
      </>
    </>
  );
}