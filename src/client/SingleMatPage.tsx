import React, { useEffect } from "react";
import SubmitResult from "./SubmitResult";
import { useParams } from "react-router-dom";

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
    </>
  );
}
