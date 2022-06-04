import React, { useEffect } from "react";
import SubmitResult from "./SubmitResult";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
import { useParams, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { ListGroup } from "react-bootstrap";
>>>>>>> master

export default function SingleMatPage(props: any) {
  const [upcomingBouts, setUpcomingBouts] = React.useState([]);

  let { eventID, matNumber } = useParams<any>();

  React.useEffect(() => {
    fetch(`/api/bouts/dispatched/${eventID}&${matNumber}`)
      .then((res) => res.json())
      .then((results) => {
        setUpcomingBouts(results);
      });
  }, []);

  return (
    <>
<<<<<<< HEAD
      <h1>
        This is mat # {matNumber} for event with id {eventID}
      </h1>
      <h2>Upcoming Bouts: </h2>
      {upcomingBouts.map((bout) => {
        return (
          <>
            <SubmitResult boutID={bout.id} />
          </>
        );
      })}
=======
      <NavigationBar />
      <h1 className="m-1">
        This is mat # {matNumber}
        <br />
        <Link to={`/events/${eventID}`}>Click here to go back to the events page</Link>
      </h1>
      <hr />
      <div style={{ border: "1px solid black", borderRadius: "5px" }} className="m-2 p-2">
        <h2 className="text-center" style={{ textDecoration: "underline" }}>Upcoming Bouts </h2>
        {upcomingBouts.map((bout, evenOdd) => {
          return (
            <>
              <SubmitResult bout={bout} evenOdd={evenOdd} />
            </>
          );
        })}
      </div>
>>>>>>> master
    </>
  );
}
