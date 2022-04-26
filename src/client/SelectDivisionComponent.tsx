import React from "react";
import { useHistory } from "react-router-dom";
import DisplayBracket from "./DisplayBracket";

export default function SelectDivisionComponent(props: any) {
  const [selectedDivision, setSelectedDivision] = React.useState();
  const [allDivisions, setAllDivisions] = React.useState([]);
  const [displayBracket, setDisplayBracket] = React.useState(false);

  const onEventChange = (event: any) => {
    setSelectedDivision(event.target.value);
  };

  let history = useHistory();

  let loadBracket = () => {
    setDisplayBracket(!displayBracket);
  };

  React.useEffect(() => {
    fetch(`/api/divisions/divisionsByEventId/${props.eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setAllDivisions(results);
      });
  }, []);

  return (
    <>
      <h2>Select the division you would like to view:</h2>
      <select onChange={onEventChange}>
{/* <<<<<<< HEAD
        <option>Select a division</option> */}
{/* ======= */}
        <option value="">Select a division</option>
{/* >>>>>>> waynesBranch */}
        {allDivisions.map((division) => {
          return (
            <option key={division.id} value={division.id}>
              {division.name_of_division}
            </option>
          );
        })}
      </select>
      <button className="btn btn-primary" onClick={loadBracket}>
        Load the bracket!
      </button>
      {displayBracket && (
        <DisplayBracket eventID={props.eventID} divisionID={selectedDivision} />
      )}
    </>
  );
}
