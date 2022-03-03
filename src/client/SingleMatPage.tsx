import React, { useEffect } from "react";
import SubmitResult from "./SubmitResult";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";

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
      <NavigationBar />
      <h1>
        This is mat # {matNumber} for event with id{" "}
        <Link to={`/events/${eventID}`}>{eventID}</Link>
      </h1>
      <h2>Upcoming Bouts: </h2>
      {upcomingBouts.map((bout) => {
        return (
          <>
            <SubmitResult bout={bout} />
          </>
        );
      })}
    </>
  );
}
