import React from "react";

export default function MatsForEvent(props: any) {
  let eventID = props.eventID;
  return (
    <>
      <h3>These are the mats for the event with an event ID of {eventID}:</h3>
      <h5>mat 1</h5>
      <h5>mat 2</h5>
    </>
  );
}
