import React from "react";
import AddCompetitorsComponent from "./AddCompetitorsComponent";

export default function EditDivisionsComponent(props: any) {
  const [divisions, setDivisions] = React.useState([]);
  const [deleteText, setDeleteText] = React.useState("");
  const [
    showInputCompetitorsComponent,
    setShowInputCompetitorsComponent,
  ] = React.useState<any>({});

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

  let handleDeleteClick = (divisionID: number) => {
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

  console.log(props.eventID);
  React.useEffect(() => {
    fetch(`/api/divisions/divisionsByEventId/${props.eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setDivisions(results);
      });
  }, []);

  return (
    <>
      <h2>List of divisions:</h2>
      <table className="table">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Name of division</th>
            <th>Input Competitors</th>
            <th>Delete this division?</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division) => {
            return (
              <>
                <tr key={division.id}>
                  <td>{division.name_of_division}</td>

                  <td>
                    <button
                      name={String(division.id)}
                      className="btn btn-primary"
                      onClick={onClickRevealInputCompetitorsComponent}
                    >
                      Add Competitors
                    </button>
                  </td>
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
                </tr>
                {showInputCompetitorsComponent[division.id] && (
                  <AddCompetitorsComponent
                    divisionID={division.id}
                    eventID={props.eventID}
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
