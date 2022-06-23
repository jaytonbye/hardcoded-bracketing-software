import React, { useState } from "react";

export default function AdminFacingStartTimeEstimator(props: any) {
  let eventID = 32; //hardcoded

  const [startTimeOfEvent, setStartTimeOfEvent] = useState();
  const [endTimeOfEvent, setEndTimeOfEvent] = useState();
  const [averageMatchLength, setAverageMatchLength] = useState();
  const [desiredTimeBetweenMatches, setDesiredTimeBetweenMatches] = useState();
  const [lengthOfWeighins, setLengthOfWeighins] = useState();
  const [
    timeBetweenWeighinsAndWrestling,
    setTimeBetweenWeighinsAndWrestling,
  ] = useState();
  const [numberOfMatsAvailable, setNumberOfMatsAvailable] = useState();

  let onStartTimeOfEventChange = (e: any) => {
    setStartTimeOfEvent(e.target.value);
  };
  let onEndTimeOfEventChange = (e: any) => {
    setEndTimeOfEvent(e.target.value);
  };
  let onAverageMatchLengthChange = (e: any) => {
    setAverageMatchLength(e.target.value);
  };
  let onDesiredTimeBetweenMatchesChange = (e: any) => {
    setDesiredTimeBetweenMatches(e.target.value);
  };
  let onLengthOfWeighinsChange = (e: any) => {
    setLengthOfWeighins(e.target.value);
  };
  let onTimeBetweenWeighinsAndWrestlingChange = (e: any) => {
    setTimeBetweenWeighinsAndWrestling(e.target.value);
  };
  let onNumberOfMatsAvailableChange = (e: any) => {
    setNumberOfMatsAvailable(e.target.value);
  };

  let handleButtonClick = () => {
    alert("clicked");
  };

  return (
    <>
      <h2>Setup AdminFacingStartTimeEstimator</h2>
      <label>Start time of event: </label>
      <input type="time" onChange={onStartTimeOfEventChange} />
      <label>Ending time of event: </label>
      <input type="time" onChange={onEndTimeOfEventChange} />
      <label>Average match length (in minutes): </label>
      <input type="number" onChange={onAverageMatchLengthChange} />
      <label>Desired time between matches (in minutes): </label>
      <input type="number" onChange={onDesiredTimeBetweenMatchesChange} />
      <label>Length of time weigh-ins will be open (in minutes): </label>
      <input type="number" onChange={onLengthOfWeighinsChange} />
      <label>
        Time between weighins closing and wrestling beginning (in minutes):{" "}
      </label>
      <input type="number" onChange={onTimeBetweenWeighinsAndWrestlingChange} />
      <label>Number of mats available: </label>
      <input type="number" onChange={onNumberOfMatsAvailableChange} />
      <button onClick={handleButtonClick} className="btn btn-primary ml-2 mt-2">
        Submit
      </button>
    </>
  );
}
