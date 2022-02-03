import React from "react";
import { useParams } from "react-router-dom";
import MatsForEvent from "./MatsForEvent";
import SelectDivisionComponent from "./SelectDivisionComponent";
import NavigationBar from "./NavigationBar";

export default function EventsPage() {
  let { event } = useParams<any>();
  const [matNumberToNavigateTo, setMatNumberToNavigateTo] = React.useState();
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

  let navigateToMat = () => {};

  let onMatNumberChange = (e: any) => {
    setMatNumberToNavigateTo(e.target.value);
  };
  return (
    <>
      <NavigationBar />
      {eventLoaded && (
        <h2>This is the page for {eventInfo[0].name_of_event}</h2>
      )}

      <SelectDivisionComponent eventID={event} />
      <label>Take me to mat #:</label>
      <input type="number" onChange={onMatNumberChange} />
      <button onClick={navigateToMat} className="btn btn-secondary">
        Go!
      </button>
      <MatsForEvent eventID={event} />
    </>
  );
}
