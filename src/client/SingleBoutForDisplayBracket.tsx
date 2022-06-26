import React from "react";
import { Card, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ModalForDisplayBrackets from "./ModalForDisplayBrackets";
import { ISingleBoutInfoAfterPutThroughFuncforActualNames } from "./services/interfaces";
import * as twilioFunctions from "./services/TwilioFunctions";
import moment from "moment";

export default function SingleBoutForDisplayBracket(props: any) {
  const [dispatchToMat, setDispatchToMat] = React.useState<
    undefined | number | any
  >();
  const [modalShow, setModalShow] = React.useState<any>({});

  let token = sessionStorage.getItem("token");
  let eventID = props.eventID;
  let index = props.index; //wtf is wc doing here?
  let bouts = props.bouts; //are we passing too much?

  let bout: ISingleBoutInfoAfterPutThroughFuncforActualNames | any = props.bout;

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
        dispatchTime: Date.now(),
      }),
    };
    fetch(`/api/bouts/dispatch`, requestOptions).then((res) => {
      if (res.ok) {
        alert(`The match was dispatched without a catch`);
        //twilio if match was dispatched succefully
        twilioFunctions.dispatchedToMatMessage(
          JSON.parse(bout.top_line_wrestler).name,
          dispatchToMat,
          bout.topLineWrestlersActualName,
          bout.bottomLineWrestlersActualName
        );
        twilioFunctions.dispatchedToMatMessage(
          JSON.parse(bout.bottom_line_wrestler).name,
          dispatchToMat,
          bout.topLineWrestlersActualName,
          bout.bottomLineWrestlersActualName
        );
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
      <Card key={`Bout ID:${bout.id}`} className="the-card-border-black m-1">
        <Card.Footer>
          <Card.Text
            className="display-4 font-weight-bold"
            style={{ fontSize: "1em" }}
          >
            {bout.topLineWrestlersActualName}
          </Card.Text>
          <Card.Text className="text-muted">
            {bout.topLineWrestlersActualTeamName}
          </Card.Text>
        </Card.Footer>

        <Card.Body>
          <Card.Title style={{ textDecoration: "underline" }}>
            <h5>Match #: {bout.match_number}</h5>
          </Card.Title>
          <em>
            <h5>
              Dispatched to mat #:{" "}
              <Link to={`/events/${eventID}/mat/${bout.dispatched_to_mat}`}>
                {bout.dispatched_to_mat}
              </Link>
            </h5>
          </em>
          <h5>Score: {bout.score}</h5>
          <div>
            <h5>
              <label
                className={classNames({
                  notReadyToBeDispatchedYet:
                    JSON.parse(bout.bottom_line_wrestler).name.slice(0, 8) ===
                      "winnerOf" ||
                    JSON.parse(bout.bottom_line_wrestler).name.slice(0, 7) ===
                      "loserOf",
                  alreadyCompleted: bout.winner,
                })}
              >
                Dispatch this match to mat number:{" "}
              </label>
            </h5>
            <input
              type="number"
              //   className="mb-2 ml-2 poop"
              className={classNames({
                notYetWrestled: !bout.winner,
                itsBeenDispatched: bout.dispatched == 1,
                notReadyToBeDispatchedYet:
                  JSON.parse(bout.bottom_line_wrestler).name.slice(0, 8) ===
                    "winnerOf" ||
                  JSON.parse(bout.bottom_line_wrestler).name.slice(0, 7) ===
                    "loserOf",
                alreadyCompleted: bout.winner,
              })}
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
              hidden={
                bout.winner ||
                JSON.parse(bout.bottom_line_wrestler).name.slice(0, 8) ===
                  "winnerOf" ||
                JSON.parse(bout.bottom_line_wrestler).name.slice(0, 7) ===
                  "loserOf"
              }
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
        </Card.Body>
        <Card.Footer>
          <Card.Text
            className="display-4 font-weight-bold"
            style={{ fontSize: "1em" }}
          >
            {bout.bottomLineWrestlersActualName}
          </Card.Text>
          <Card.Text className="text-muted">
            {bout.bottomLineWrestlersActualTeamName}
          </Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
}
