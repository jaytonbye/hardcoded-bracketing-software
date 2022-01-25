import React from "react";
import { useHistory } from "react-router-dom";

export default function EventsPage() {
  const onEventChange = (event: any) => {
    console.log(event.target.value);
  };

  let history = useHistory();

  let goToPage = () => {
    history.push("/showAllLoggins");
  };

  return (
    <>
      <h2>Select the event:</h2>
      <select id="theSelect" onChange={onEventChange}>
        <option value="1">Option 1 will go here</option>
        <option value="2">Option 2 will go here</option>
      </select>
      <button className="btn btn-primary" onClick={goToPage}>
        Go to the events page!
      </button>
    </>
  );
}
