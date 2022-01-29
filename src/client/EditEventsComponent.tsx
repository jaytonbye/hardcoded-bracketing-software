import React from "react";

export default function EditEventsComponent() {
  const [events, setEvents] = React.useState([]);
  const [deleteText, setDeleteText] = React.useState("");

  let onTextChange = (e: any) => {
    setDeleteText(e.target.value);
  };

  let handleDeleteClick = (eventID: number) => {
    if (deleteText.toLocaleLowerCase() === "delete") {
      let token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventID,
        }),
      };
      fetch(`/api/events/${eventID}`, requestOptions).then((res) => {
        if (res.ok) {
          alert("Event deleted");
          window.location.reload();
        } else {
          alert("it didn't work!");
        }
      });
    } else {
      alert('you must tyle "delete" in order to delete the event');
    }
  };

  React.useEffect(() => {
    fetch(`/api/events`)
      .then((res) => res.json())
      .then((results) => {
        setEvents(results);
      });
  }, []);

  return (
    <>
      <h2>List of events:</h2>
      <table className="table">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Name of event</th>
            <th>Date</th>
            <th>Location</th>
            <th>Delete this event?</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.name_of_event}</td>
                <td>{event.date_of_event}</td>
                <td>{event.location_of_event}</td>
                <td>
                  <input type="text" onChange={onTextChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(event.id)}
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
