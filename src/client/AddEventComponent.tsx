import React from "react";

export default function AddEventComponent() {
  const [name, setName] = React.useState();
  const [date, setDate] = React.useState();
  const [location, setLocation] = React.useState();

  let onNameChange = (e: any) => {
    setName(e.target.value);
  };
  let onDateChange = (e: any) => {
    setDate(e.target.value);
  };
  let onLocationChange = (e: any) => {
    setLocation(e.target.value);
  };

  let submitEvent = () => {
    let token = sessionStorage.getItem("token");
    let userID = 1; //Number(sessionStorage.getItem("UID")); //hardcoded
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        userID,
        name,
        date,
        location,
      }),
    };
    fetch("/api/events", requestOptions).then((res) => {
      if (res.ok) {
        alert("Event added");
      } else {
        alert("it didn't work!");
      }
    });
  };
  return (
    <>
      <h2>Add an event:</h2>
      <label>Name: </label>
      <input type="text" onChange={onNameChange} />
      <label>Date: </label>
      <input type="date" onChange={onDateChange} />
      <label>Location: </label>
      <input type="text" onChange={onLocationChange} />
      <button onClick={submitEvent} className="btn btn-primary ml-2 mt-2">
        Submit Event
      </button>
    </>
  );
}
