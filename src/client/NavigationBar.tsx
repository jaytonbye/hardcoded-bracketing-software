import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NavigationBar() {
  const [counter, setCounter] = React.useState(0);
  const [userRole, setUserRole] = React.useState("");

  let UID = Number(sessionStorage.getItem("UID"));

  React.useEffect(() => {
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setUserRole(results[0].role);
      });
  });

  let history = useHistory();
  let logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("UID");
    history.push("/");
  };

  let goToAdminPage = () => {
    history.push("/admin");
  };
  let goToHome = () => {
    history.push("/homepage");
  };
  let goToRegisterForEvenetPage = () => {
    history.push("/registrations");
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button className="btn btn-outline-primary" onClick={goToHome}>
            Events
          </button>
          <button
          style={{backgroundColor:"lawngreen"}}
            className="btn btn-outline-primary"
            onClick={goToRegisterForEvenetPage}
          >
            <u>Register for an event</u>
          </button>
          {userRole === "admin" && (
            <button className="btn btn-outline-danger" onClick={goToAdminPage}>
              Admin Panel
            </button>
          )}
          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
