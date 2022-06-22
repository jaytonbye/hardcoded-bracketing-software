import React from "react";
import { useHistory } from "react-router-dom";
import DisplayBracket from "./DisplayBracket";
import DisplayBracketRoundRobin from "./DisplayBracketRoundRobin";
import DisplayBracketV2 from "./DisplayBracketV2";
import { IAllDivisionsByEvent } from "./registration/interfaces";

export default function SelectDivisionComponent(props: any) {
  const [selectedDivisionId, setSelectedDivisionId] = React.useState();
  const [selectedDivisionBracketType, setSelectedDivisionBracketType] =
    React.useState();
  const [allDivisions, setAllDivisions] = React.useState<
    IAllDivisionsByEvent[]
  >([]);
  const [displayBracket, setDisplayBracket] = React.useState(false);
  const [displayBracketList, setDisplayBracketList] = React.useState(false);

  const onEventChange = (event: any) => {
    let theEvent = event.target.value.split("||");
    setSelectedDivisionId(theEvent[1]);
    setSelectedDivisionBracketType(theEvent[0]);
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
        <option value="">Select a weight class</option>
        {allDivisions.map((division) => {
          let { id, bracket_type } = division;
          return (
            <option key={division.id} value={bracket_type + "||" + id}>
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
      {displayBracket && selectedDivisionBracketType === "double-elimination" && (
        // <DisplayBracket eventID={props.eventID} divisionID={selectedDivisionId} />
        <DisplayBracketV2
          eventID={props.eventID}
          divisionID={selectedDivisionId}
        />
      )}
      {displayBracketList &&
        selectedDivisionBracketType === "double-elimination" && (
          // <DisplayBracket eventID={props.eventID} divisionID={selectedDivisionId} />
          <DisplayBracket
            eventID={props.eventID}
            divisionID={selectedDivisionId}
          />
        )}
      {displayBracket && selectedDivisionBracketType === "round-robin" && (
        // <DisplayBracket eventID={props.eventID} divisionID={selectedDivisionId} />
        <DisplayBracketRoundRobin
          eventID={props.eventID}
          divisionID={selectedDivisionId}
        />
      )}
      {displayBracketList && selectedDivisionBracketType === "round-robin" && (
        // <DisplayBracket eventID={props.eventID} divisionID={selectedDivisionId} />
        <DisplayBracket
          eventID={props.eventID}
          divisionID={selectedDivisionId}
        />
      )}
    </div>
  );
}
