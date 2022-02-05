import React, { useEffect } from "react";
import SubmitResult from "./SubmitResult";

export default function SingleMatPage(props: any) {
  const [upcomingBouts, setUpcomingBouts] = React.useState([]);

  let eventID = 1; //hardcoded
  let matNumber = 1; //hardcoded

  React.useEffect(() => {
    fetch(`/api/bouts/dispatched/${eventID}&${matNumber}`)
      .then((res) => res.json())
      .then((results) => {
        setUpcomingBouts(results);
      });
  }, []);

  return (
    <>
      <h1>This is mat # _ for event with id _</h1>
      <h2>Upcoming Bouts: </h2>
      {upcomingBouts.map((bout) => {
        return (
          <>
            <SubmitResult boutID={bout.id} />
            <h1>poop</h1>;
          </>
        );
      })}
    </>
  );
}
