import React from "react";
import { Link } from "react-router-dom";

export default function MatsForEvent(props: any) {
  let eventID = props.eventID;
  const [matches, setMatches] = React.useState([]);
  const [mats, setMats] = React.useState([]);

  React.useEffect(() => {
    fetch(`/api/bouts/allDispatched/${eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setMatches(results);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/bouts/matsThatHaveBoutsAssigned/${eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setMats(results);
      });
  }, []);

  return (
    <>
      <h5>The following mats currently have matches assigned:</h5>
      {mats.map((mat) => {
        return (
          <p>
            <Link to={`/events/${eventID}/mat/${mat.dispatched_to_mat}`}>
              Mat {mat.dispatched_to_mat}
            </Link>{" "}
            - {mat.count} Matches
          </p>
        );
      })}
    </>
  );
}
