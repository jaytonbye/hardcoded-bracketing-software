import React, { useEffect, useState } from "react";
import SubmitResult from "./SubmitResult";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { ListGroup } from "react-bootstrap";
import MatsForEvent from "./MatsForEvent";

export default function SingleMatPage(props: any) {
  const [upcomingBouts, setUpcomingBouts] = React.useState([]);
  // const [
  //   boolUsedOnlyForReRenderingThisComponent,
  //   setBoolUsedOnlyForReRenderingThisComponent,
  // ] = useState<boolean>(false);

  let { eventID, matNumber } = useParams<any>();

  React.useEffect(() => {
    fetch(`/api/bouts/dispatched/${eventID}&${matNumber}`)
      .then((res) => res.json())
      .then((results) => {
        setUpcomingBouts(results);
      });
  }, [matNumber]);
  // boolUsedOnlyForReRenderingThisComponent

  return (
    <>
      <NavigationBar />
      <h1 className="m-1">
        This is mat # {matNumber}
        <br />
        <Link to={`/events/${eventID}`}>
          Click here to go back to the events page
        </Link>
      </h1>
      <hr />
      <div
        style={{ border: "1px solid black", borderRadius: "5px" }}
        className="m-2 p-2"
      >
        <h2 className="text-center" style={{ textDecoration: "underline" }}>
          Upcoming Bouts{" "}
        </h2>
        {upcomingBouts.map((bout, evenOdd) => {
          return (
            <>
              <SubmitResult
                bout={bout}
                evenOdd={evenOdd}
                // boolUsedOnlyForReRenderingThisComponent={
                //   setBoolUsedOnlyForReRenderingThisComponent
                // }
              />
            </>
          );
        })}
        <MatsForEvent eventID={eventID} />
      </div>
    </>
  );
}
