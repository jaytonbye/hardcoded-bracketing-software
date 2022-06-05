import React from "react";
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function SingleBoutForDisplayBracketPublicVersion(props: any) {
  const [dispatchToMat, setDispatchToMat] = React.useState();
  const [modalShow, setModalShow] = React.useState<any>({});

  let token = sessionStorage.getItem("token");
  let eventID = props.eventID;
  let index = props.index; //wtf is wc doing here?
  let bouts = props.bouts; //are we passing too much?

  let bout = props.bout;

  return (
    <>
      <div className="simpleBorder">
        <div>{JSON.parse(bout.top_line_wrestler).name}</div>

        <div>{JSON.parse(bout.top_line_wrestler).team}</div>
        <hr />
        <div>{JSON.parse(bout.bottom_line_wrestler).name}</div>
        <div>{JSON.parse(bout.bottom_line_wrestler).team}</div>
        <hr />
        <em>
          <div>
            Dispatched to mat #:{" "}
            <Link to={`/events/${eventID}/mat/${bout.dispatched_to_mat}`}>
              {bout.dispatched_to_mat}
            </Link>
          </div>
        </em>
      </div>
    </>
  );
}
