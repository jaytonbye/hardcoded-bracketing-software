import React from "react";

export default function EditDivisionsComponent(props: any) {
  const [divisions, setDivisions] = React.useState([]);
  const [deleteText, setDeleteText] = React.useState("");

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
      alert('you must tyle "delete" in order to delete the division');
    }
  };

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
            <th>Date</th>
            <th>Location</th>
            <th>Delete this division?</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division) => {
            return (
              <tr key={division.id}>
                <td>{division.name_of_division}</td>
                <td>{division.date_of_event}</td>
                <td>{division.location_of_event}</td>
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
            );
          })}
        </tbody>
      </table>
    </>
  );
}
