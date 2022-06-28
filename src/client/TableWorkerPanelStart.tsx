import * as React from "react";
import EditDivisionsComponent from "./EditDivisionsComponent";
import MatsForEvent from "./MatsForEvent";
import NavigationBar from "./NavigationBar";
import { useHistory } from "react-router-dom";

const TableWorkerPanelStart = () => {
  let [eventIdPrivleges, setEventIdPrivleges] = React.useState<
    string | number
  >();
  let [matNumberToNavigateTo, setMatNumberToNavigateTo] = React.useState<
    string | number
  >();
  let [showDivisions, setShowDivisions] = React.useState<boolean>(true);
  let [showMatView, setShowMatView] = React.useState<boolean>(false);
  let UID = Number(sessionStorage.getItem("UID"));
  let history = useHistory();

  //   console.log("re");
  React.useEffect(() => {
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setEventIdPrivleges(results[0].priviliges_for_event_ID);
      });
  }, []);

  let showOrHideDivisions = () => {
    setShowDivisions(!showDivisions);
    setShowMatView(false);
  };

  let showOrHideMatView = () => {
    setShowMatView(!showMatView);
    setShowDivisions(false);
  };

  let onMatNumberChange = (e: any) => {
    setMatNumberToNavigateTo(e.target.value);
  };

  let navigateToMat = () => {
    history.push(`/events/${eventIdPrivleges}/mat/${matNumberToNavigateTo}`);
  };

  return (
    <div>
      <NavigationBar />
      <div className="mt-3">
        <div>
          <button onClick={showOrHideDivisions} className="btn btn-success m-2">
            Division
          </button>
          <button onClick={showOrHideMatView} className="btn btn-success">
            Mats
          </button>
        </div>
        {eventIdPrivleges && showDivisions && (
          <div>
            <EditDivisionsComponent eventID={eventIdPrivleges} />
          </div>
        )}
        {showMatView && (
          <div>
            <MatsForEvent eventID={eventIdPrivleges} />
            {/* <MatsForEvent eventID={eventIdPrivleges} /> */}
            <label className="m-2 mt-3">Take me to mat #:</label>
            <input type="number" onChange={onMatNumberChange} />
            <button onClick={navigateToMat} className="btn btn-secondary ml-1">
              Go!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableWorkerPanelStart;
