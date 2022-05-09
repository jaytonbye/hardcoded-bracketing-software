import React from "react";
import { ListGroup } from "react-bootstrap";
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

  // </Card.Header>
  //       <Card.Body>
  //         <Card.Title className="fw-light">Earnable Items</Card.Title>
  //         <ListGroup className="my-3">
  //           {state.earnableItems.map((item) => (
  //             <ListGroup.Item
  //               key={`key-${item.id}-${props.UID}`}
  //               className="py-3 d-flex justify-content-between align-items-center"
  //             >
  //               <span>
  //                 {item.item_color} {item.item_name}
  //               </span>
  //               <span>
  //                 {Math.ceil(
  //                   (item.percentage_of_total_points_needed *
  //                     state.totalPointsAvailable) /
  //                   100
  //                 )}{" "}
  //                 <small className="text-muted">points req.</small>
  //               </span>
  //             </ListGroup.Item>
  //           ))}
  //         </ListGroup>
  //         <Card.Text>
  //           {state.personalInfo.first_name} has earned{" "}
  //           <strong>{state.totalPointsEarnedByWrestler}</strong> of{" "}
  //           <strong>{state.totalPointsAvailable}</strong> total available
  //           points.
  //         </Card.Text>
  //         <Card.Text>
  //           <small className="text-muted">current item earned</small>{" "}
  //           <strong>{state.currentItemEarned}</strong>
  //         </Card.Text>
  //       </Card.Body>
  //       <Card.Footer>
  //         <small className="text-muted">next item</small>{" "}
  //         <span className="fst-italic text-dark">
  //           {state.nextItemToBeEarned}
  //         </span>
  //       </Card.Footer>
  //     </Card>

  return (
    <>
      <h5 className="mt-3">The following mats currently have matches assigned:</h5>
      <ListGroup className="col-xs-10 col-md-3 m-2">
        {mats.map((mat) => {
          return (
            <ListGroup.Item key={mat.dispatched_to_mat} className="list-group-item">
              <div>
                <Link to={`/events/${eventID}/mat/${mat.dispatched_to_mat}`}>
                  Mat {mat.dispatched_to_mat}
                </Link>{" "}
                <span className="text-muted">- {mat.count} Matches</span>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

    </>
  );
}
