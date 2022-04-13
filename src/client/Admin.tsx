import React from "react";
import NavigationBar from "./NavigationBar";
import AddEventComponent from "./AddEventComponent";
import EditEventsComponent from "./EditEventsComponent";
import AddStaffComponent from "./AddStaffComponent";

export default function Admin() {
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [showEditEvents, setShowEditEvents] = React.useState(false);
  const [showAddStaff, setShowAddStaff] = React.useState(false);

  let showOrHideTheAddEventComponent = () => {
    setShowAddEvent(!showAddEvent);
  };
  let showOrHideTheEditEventsComponent = () => {
    setShowEditEvents(!showEditEvents);
  };
  let showOrHideTheAddStaffComponent = () => {
    setShowAddStaff(!showAddStaff);
  };

  return (
    <>
      <NavigationBar />
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheAddEventComponent}
      >
        Add New Event
      </button>
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheEditEventsComponent}
      >
        Edit Events
      </button>
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheAddStaffComponent}
      >
        Add New Staff Login
      </button>
      {showAddEvent && <AddEventComponent />}
      {showEditEvents && <EditEventsComponent />}
      {showAddStaff && <AddStaffComponent />}
    </>
  );
}
