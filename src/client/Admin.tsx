import React from "react";
import NavigationBar from "./NavigationBar";
import AddEventComponent from "./AddEventComponent";
import EditEventsComponent from "./EditEventsComponent";

export default function Admin() {
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [showEditEvents, setShowEditEvents] = React.useState(false);

  let showOrHideTheAddEventComponent = () => {
    setShowAddEvent(!showAddEvent);
  };
  let showOrHideTheEditEventsComponent = () => {
    setShowEditEvents(!showEditEvents);
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
      {showAddEvent && <AddEventComponent />}
      {showEditEvents && <EditEventsComponent />}
    </>
  );
}
