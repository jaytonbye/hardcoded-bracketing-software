import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import MatsForEvent from "./MatsForEvent";
import SelectDivisionComponent from "./SelectDivisionComponent";
import NavigationBar from "./NavigationBar";
import { IAllEvents } from "./registration/interfaces";
import BracketView from "./BracketVeiw";

export default function EventsPage() {
  let { event } = useParams<any>();
  const [matNumberToNavigateTo, setMatNumberToNavigateTo] = React.useState();
  const [eventInfo, setEventinfo] = React.useState<IAllEvents[]>([]);
  const [eventLoaded, setEventLoaded] = React.useState(false);
  const [showMats, setShowMats] = React.useState(false);
  const [showBracketsView, setShowBracketsView] =
    React.useState<boolean>(false);
  const [showSearchByWrestlerView, setShowSearchByWrestlerView] =
    React.useState<boolean>(false);
  let history = useHistory();

  React.useEffect(() => {
    fetch(`/api/events/${event}`)
      .then((res) => res.json())
      .then((results) => {
        setEventinfo(results);
        setEventLoaded(true);
      });
  }, []);

  let navigateToMat = () => {
    history.push(`/events/${event}/mat/${matNumberToNavigateTo}`);
  };

  let onMatNumberChange = (e: any) => {
    setMatNumberToNavigateTo(e.target.value);
  };

  let onRevealMats = () => {
    setShowMats(!showMats);
    setShowBracketsView(false);
  };
  let onRevealBrackets = () => {
    setShowBracketsView(!showBracketsView);
    setShowMats(false);
  };

  return (
    <>
      <NavigationBar />
      {/* style={{ border: "solid 1px black" }} */}
      <div className="m-2 p-2" >
        <div>
          {eventLoaded && <h4>Event: {eventInfo[0].name_of_event}</h4>}
          <button className="btn btn-primary m-2" onClick={onRevealMats}>
            Mat view
          </button>
          <button className="btn btn-primary m-2" onClick={onRevealBrackets}>
            Bracket view
          </button>
          <button className="btn btn-primary m-2" >
            Search by wrestler
          </button>
          {showMats && (
            <div>
              <MatsForEvent eventID={event} />
              <label className="m-2 mt-3">Take me to mat #:</label>
              <input type="number" onChange={onMatNumberChange} />
              <button
                onClick={navigateToMat}
                className="btn btn-secondary ml-1"
              >
                Go!
              </button>
            </div>
          )}
        </div>
        {showBracketsView && (
          <div>
            <SelectDivisionComponent eventID={event} />
          </div>
        )}
      </div>
    </>
  );
}
