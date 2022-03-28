import React, { EventHandler } from "react";
import { Link, useHistory } from "react-router-dom";
import { apiService } from "./services/api-services";

function AddStaffComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userEventPriviliges, setUserEventPriviliges] = React.useState("");
  const [createdAccountsRoll, setCreatedAccountsRoll] = React.useState(
    "tableWorker"
  );

  let UID = Number(sessionStorage.getItem("UID"));

  //gets the user's event, so that the created accounts can only edit the correct events.
  React.useEffect(() => {
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        console.log({ results });
        setUserEventPriviliges(results[0].priviliges_for_event_ID);
      });
  });

  let history = useHistory();

  const handleCreateAccount = (e: any) => {
    e.preventDefault();
    let token = sessionStorage.getItem("token");
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: createdAccountsRoll,
          priviliges_for_event_ID: userEventPriviliges,
        }),
      };

      //covalence : It sends the alert that the account was created whether or not it works. How can I fix this? Is it because it's not in a try block?
      fetch("/api/users/forEventAdminCreatedAccounts", requestOptions).then(
        (data) => {
          apiService("/auth/login", "POST", {
            email,
            password,
          });
          alert("The account was created!");
          history.go(0);
        }
      );
    } catch (error) {
      alert("it didn't work");
      // error is already logged from apiService
      // so possibly use history object to navigate to error page?
    }
  };

  return (
    <>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form className="p-4 border rounded shadown form-group">
            <h2>Add staff members to your event and set their access level:</h2>
            <label>Username: </label>
            <input
              className="mb-2 form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password: </label>
            <input
              type="password"
              autoComplete="password"
              className="mb-2 form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Role: </label>
            <select
              name="role"
              id="role"
              className="mb-2 form-control"
              onChange={(e) => setCreatedAccountsRoll(e.target.value)}
            >
              <option value="tableWorker">
                Table worker (can enter match results)
              </option>
              <option value="administrator">
                Administator (has full administrative priviliges)
              </option>
            </select>
            <button onClick={handleCreateAccount} className="btn btn-primary">
              Create Account
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default AddStaffComponent;
