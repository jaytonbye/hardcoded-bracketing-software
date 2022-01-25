import React from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "../types";
import MatsForEvent from "./MatsForEvent";

export default function EventsPage() {
  let { event } = useParams<any>();
  const [eventInfo, setEventinfo] = React.useState([]);
  const [eventLoaded, setEventLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/events/${event}`)
      .then((res) => res.json())
      .then((results) => {
        setEventinfo(results);
        setEventLoaded(true);
      });
  }, []);

  return (
    <>
      {eventLoaded && (
        <h2>This is the page for {eventInfo[0].name_of_event}</h2>
      )}
      <MatsForEvent eventID={event} />
    </>
  );
}
