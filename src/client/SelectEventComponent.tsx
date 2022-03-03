import React from "react";
import { useHistory } from "react-router-dom";

export default function EventsPage() {
  const [navigateToEvent, setNavigateToEvent] = React.useState();
  const [allEvents, setAllEvents] = React.useState([]);

  const onEventChange = (event: any) => {
    setNavigateToEvent(event.target.value);
  };

  let history = useHistory();

  let goToPage = () => {
    history.push(`/events/${navigateToEvent}`);
  };

  React.useEffect(() => {
    fetch(`/api/events`)
      .then((res) => res.json())
      .then((results) => {
        setAllEvents(results);
      });
  }, []);

  return (
    <>
      <h4>Select the event:</h4>
      <select onChange={onEventChange}>
        <option>Select an event</option>
        {allEvents.map((event) => {
          return (
            <option key={event.id} value={event.id}>
              {event.name_of_event}
            </option>
          );
        })}
      </select>
      <button className="btn btn-primary" onClick={goToPage}>
        Go to the events page!
      </button>
    </>
  );
}
