import React from "react";
import NavigationBar from "./NavigationBar";
import AddDivisionComponent from "./AddDivisionComponent";
import EditDivisionsComponent from "./EditDivisionsComponent";
import { useParams } from "react-router-dom";
import AddStaffComponent from "./AddStaffComponent";
import EditAllWrestlersOrAllInEvent from "./EditAllWrestlersOrAllInEvent";

export default function Admin() {
  const [
    buttonTextShowWresltersOrDivision,
    setButtonTextShowWresltersOrDivision,
  ] = React.useState<string>("All wrestlers in event");
  const [showAddDivision, setShowAddDivision] = React.useState(false);
  const [showAddStaff, setShowAddStaff] = React.useState(false);
  const [showEditDivisions, setShowEditDivisions] =
    React.useState<boolean>(true);
  const [showEditAllWrestlersInEvent, setShowEditAllWrestlersInEvent] =
    React.useState<boolean>(false);
  //const [showEditDivisions, setShowEditDivisions] = React.useState(false);

  let { eventID } = useParams<any>();

  eventID = Number(eventID);

  let showOrHideTheAddDivisionComponent = () => {
    setShowAddDivision(!showAddDivision);
    setShowAddStaff(false);
  };
  let showOrHideTheAddStaffComponent = () => {
    setShowAddStaff(!showAddStaff);
    setShowAddDivision(false);
  };
  let showOrHideAllWrestlers = () => {
    if (showEditDivisions) {
      setButtonTextShowWresltersOrDivision("List of Divisions");
      setShowEditAllWrestlersInEvent(true);
      setShowEditDivisions(false);
    } else {
      setButtonTextShowWresltersOrDivision("All Wrestlers in event");
      setShowEditAllWrestlersInEvent(false);
      setShowEditDivisions(true);
    }
  };
  //   let showOrHideTheEditDivisionsComponent = () => {
  //     setShowEditDivisions(!showEditDivisions);
  //   };

  return (
    <>
      <NavigationBar />
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheAddDivisionComponent}
      >
        Add New Division
      </button>
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheAddStaffComponent}
      >
        Add New Staff Login
      </button>
      <button
        className="btn btn-success ml-2 mt-2"
        onClick={showOrHideAllWrestlers}
      >
        {buttonTextShowWresltersOrDivision}
      </button>
      {/* <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheEditDivisionsComponent}
      >
        Edit Divisions
      </button> */}
      {showAddDivision && <AddDivisionComponent eventID={eventID} />}
      {showAddStaff && <AddStaffComponent />}

      {showEditDivisions && <EditDivisionsComponent eventID={eventID} />}
      {showEditAllWrestlersInEvent && (
        <EditAllWrestlersOrAllInEvent eventID={eventID} />
      )}
    </>
  );
}
