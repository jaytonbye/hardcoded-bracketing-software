import React from "react";
import { useParams, useHistory } from "react-router-dom";
import MatsForEvent from "./MatsForEvent";
import SelectDivisionComponent from "./SelectDivisionComponent";
import NavigationBar from "./NavigationBar";

export default function EventsPage() {
  let { event } = useParams<any>();
  const [matNumberToNavigateTo, setMatNumberToNavigateTo] = React.useState();
  const [eventInfo, setEventinfo] = React.useState([]);
  const [eventLoaded, setEventLoaded] = React.useState(false);
  const [showMats, setShowMats] = React.useState(true);

  let history = useHistory();

  React.useEffect(() => {
    fetch(`/api/events/${event}`)
      .then((res) => res.json())
      .then((results) => {
        setEventinfo(results);
        setEventLoaded(true);
      });
  }, []);

  console.log({ eventInfo });

  let navigateToMat = () => {
    history.push(`/events/${event}/mat/${matNumberToNavigateTo}`);
  };

  let onMatNumberChange = (e: any) => {
    setMatNumberToNavigateTo(e.target.value);
  };

  let onRevealMats = () => {
    setShowMats(!showMats);
  };

  return (
    <>
      <NavigationBar />
      {eventLoaded && <h4>Event: {eventInfo[0].name_of_event}</h4>}
      <button className="btn btn-primary" onClick={onRevealMats}>
        Show/Hide mats
      </button>
      {showMats && <MatsForEvent eventID={event} />}
      <label>Take me to mat #:</label>
      <input type="number" onChange={onMatNumberChange} />
      <button onClick={navigateToMat} className="btn btn-secondary">
        Go!
      </button>

      <SelectDivisionComponent eventID={event} />
    </>
  );
}
