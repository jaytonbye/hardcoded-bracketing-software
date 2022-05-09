import React from "react";
import { useHistory } from "react-router-dom";
import DisplayBracket from "./DisplayBracket";
import DisplayBracketV2 from "./DisplayBracketV2";

export default function SelectDivisionComponent(props: any) {
  const [selectedDivision, setSelectedDivision] = React.useState();
  const [allDivisions, setAllDivisions] = React.useState([]);
  const [displayBracket, setDisplayBracket] = React.useState(false);
  const [displayBracketList, setDisplayBracketList] = React.useState(false);

  const onEventChange = (event: any) => {
    setSelectedDivision(event.target.value);
    console.log(event.target.value);
    console.log({ selectedDivision });
  };

  let history = useHistory();

  let loadBracket = () => {
    if (displayBracketList) {
      setDisplayBracketList(false);
    }
    setDisplayBracket(!displayBracket);
  };
  let loadBracketList = () => {
    if (displayBracket) {
      setDisplayBracket(false);
    }
    setDisplayBracketList(!displayBracketList);
  };

  React.useEffect(() => {
    fetch(`/api/divisions/divisionsByEventId/${props.eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setAllDivisions(results);
      });
  }, []);

  console.log({ allDivisions });

  return (
    <div className="m-2">
      <h4>To view the brackets, select the division you would like to view:</h4>
      <select onChange={onEventChange}>
        <option value="">Select a division</option>
        {allDivisions.map((division) => {
          return (
            <option key={division.id} value={division.id}>
              {division.name_of_division}
            </option>
          );
        })}
      </select>
      <button className="btn btn-primary m-1" onClick={loadBracket}>
        Show/hide full bracket!
      </button>
      <button className="btn btn-secondary m-1" onClick={loadBracketList}>
        Show/hide bracket list!
      </button>
      {displayBracket && (
        // <DisplayBracket eventID={props.eventID} divisionID={selectedDivision} />
        <DisplayBracketV2
          eventID={props.eventID}
          divisionID={selectedDivision}
        />
      )}
      {displayBracketList && (
        // <DisplayBracket eventID={props.eventID} divisionID={selectedDivision} />
        <DisplayBracket
          eventID={props.eventID}
          divisionID={selectedDivision}
        />
      )}
    </div>
  );
}
