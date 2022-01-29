import React from "react";

export default function AddEventComponent() {
  let submitEvent = () => {
    //alert('works')
  };
  return (
    <>
      <h2>Add an event:</h2>
      <label>Name: </label>
      <input type="text" />
      <label>Date: </label>
      <input type="date" />
      <label>Location: </label>
      <input type="text" />
      <button onClick={submitEvent} className="btn btn-primary ml-2 mt-2">
        Submit Event
      </button>
    </>
  );
}
