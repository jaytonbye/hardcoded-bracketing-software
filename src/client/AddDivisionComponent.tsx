import React from "react";

export default function AddDivisionComponent(props: any) {
  const [name, setName] = React.useState();
  const [age, setAge] = React.useState();
  const [weightClass, setWeightClass] = React.useState();

  let onNameChange = (e: any) => {
    setName(e.target.value);
  };
  let onAgeChange = (e: any) => {
    setAge(e.target.value);
  };
  let onWeightClassChange = (e: any) => {
    setWeightClass(e.target.value);
  };

  let submitDivision = () => {
    let token = sessionStorage.getItem("token");
    let userID = 1; //Number(sessionStorage.getItem("UID"));
    let eventID = props.eventID;
    console.log(eventID);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        userID,
        name,
        age,
        weightClass,
        eventID,
      }),
    };
    fetch("/api/divisions", requestOptions).then((res) => {
      if (res.ok) {
        alert("Division added");
      } else {
        alert("it didn't work!");
      }
    });
  };
  return (
    <>
      <h2>Add a Division:</h2>
      <label>Name: </label>
      <input type="text" onChange={onNameChange} />
      <label>Age: </label>
      <input type="number" onChange={onAgeChange} />
      <label>Weight Class: </label>
      <input type="text" onChange={onWeightClassChange} />
      <button onClick={submitDivision} className="btn btn-primary ml-2 mt-2">
        Submit Division
      </button>
    </>
  );
}
