import React from "react";
import AddCompetitorsComponent from "./AddCompetitorsComponent";
import { IAllDivisionsByEvent } from "./registration/interfaces";

export default function EditDivisionsComponent(props: any) {
  const [divisions, setDivisions] = React.useState<IAllDivisionsByEvent[]>([]);
  const [deleteText, setDeleteText] = React.useState("");
  const [showInputCompetitorsComponent, setShowInputCompetitorsComponent] =
    React.useState<any>({});
  const [eventName, setEventName] = React.useState<string>();
  const [role, setRole] = React.useState<string>();
  let UID = sessionStorage.getItem("UID");

  let onClickRevealInputCompetitorsComponent = (e: any) => {
    setShowInputCompetitorsComponent((prev: {}) => {
      return {
        ...prev,
        [e.target.name]: !showInputCompetitorsComponent[e.target.name],
      };
    });
  };

  let onTextChange = (e: any) => {
    setDeleteText(e.target.value);
  };

  let handleDeleteClick = (divisionID: number | string) => {
    if (deleteText.toLocaleLowerCase() === "delete") {
      let token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          divisionID,
        }),
      };
      fetch(`/api/divisions/${divisionID}`, requestOptions).then((res) => {
        if (res.ok) {
          alert("Division deleted");
          window.location.reload();
        } else {
          alert("it didn't work!");
        }
      });
    } else {
      alert(
        'you must tyle "delete" in order to delete the division. Be careful, this will permanently delete all of the bouts in this division. There is no undoing this operation.'
      );
    }
  };

  React.useEffect(() => {
    fetch(`/api/divisions/divisionsByEventId/${props.eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setDivisions(results);
      });
    fetch(`/api/events/${props.eventID}`)
      .then((res) => res.json())
      .then((res) => setEventName(res[0].name_of_event));
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setRole(results[0].role);
      });
  }, [props.eventID]);

  React.useEffect(() => {}, []);

  return (
    <>
      <h2>All divisions: {eventName}</h2>
      <table className="table">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Name of division</th>
            <th>Input Competitors</th>

            {role === "admin" && (
              <>
                <th>Delete this division?</th>
                <th>Delete Button</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {divisions.map((division) => {
            return (
              <>
                <tr key={division.id}>
                  <td>{division.name_of_division} </td>

                  <td>
                    <button
                      name={String(division.id)}
                      className="btn btn-primary"
                      onClick={onClickRevealInputCompetitorsComponent}
                    >
                      Edit Competitors
                    </button>
                  </td>
                  {role === "admin" && (
                    <>
                      <td>
                        <input type="text" onChange={onTextChange} />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteClick(division.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
                {showInputCompetitorsComponent[division.id] && (
                  <AddCompetitorsComponent
                    divisionID={division.id}
                    eventID={props.eventID}
                    role={role}
                  />
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
