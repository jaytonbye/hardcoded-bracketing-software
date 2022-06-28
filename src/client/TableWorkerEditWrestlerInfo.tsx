import * as React from "react";
import { IRegistrationInfoFromTableWorker } from "./services/interfaces";

const TableWorkerEditWrestlerInfo = (props: IProps) => {
  let [phoneNumber, setPhoneNumber] = React.useState<string>();
  let [weightTheyWeighedInAt, setWeightTheyWeighedInAt] = React.useState<
    string | number | any
  >(props.allWrestlersInDivision.weight_they_weighed_in_at);
  let [showWieghtSubmitButton, setShowWieghtSubmitButton] =
    React.useState<boolean>(false);
  let [showPhoneNumberButton, setShowPhoneNumberButton] =
    React.useState<boolean>(false);
  let [editPopUpDisplay, setEditPopUpDisplay] = React.useState<string>("none");

  
  let handleNameClick = () => {
    if (editPopUpDisplay === "none") {
      setEditPopUpDisplay("inline");
    } else {
      setEditPopUpDisplay("none");
    }
  };

  let submitWeight = () => {
    fetch(`/api/registrations/updateRegistrationsWieght`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weight: weightTheyWeighedInAt === "" ? null : weightTheyWeighedInAt,
        registrationId: props.allWrestlersInDivision.id,
      }),
    }).then((res) => {
      if (res.ok) {
        alert(`Weigh-in successful`);
        setEditPopUpDisplay("none");
        setShowWieghtSubmitButton(false);
        props.reRenderParent();
        // props.funForReRenderFromEditAllWrestlers();
      } else {
        alert(
          "Something went wrong. Weigh-in failed. Make sure weight contains only numbers"
        );
      }
    });
  };

  let submitPhoneNumber = () => {
    if (!Number(phoneNumber) || !phoneNumber || phoneNumber.length < 10) {
      alert("Phone number must be 10 digits long and only contain numbers.");
    } else {
      fetch(`/api/registrations/updateRegistrationsPhoneNumber`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          registrationId: props.allWrestlersInDivision.id,
        }),
      }).then((res) => {
        if (res.ok) {
          alert(`Phone number updated`);
          setEditPopUpDisplay("none");
          setShowWieghtSubmitButton(false);
          props.reRenderParent();
          // props.funForReRenderFromEditAllWrestlers();
        } else {
          alert(
            "Something went wrong. Phone number not added. Make sure phone number contains only numbers"
          );
        }
      });
    }
  };
  if (props.allWrestlersInDivision == undefined) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div className="d-flex justify-content-start align-items-center">
          <p
            className="btn-link m-1"
            style={{ color: "black" }}
            onClick={handleNameClick}
          >
            {props.allWrestlersInDivision.first_name}{" "}
            {props.allWrestlersInDivision.last_name}
          </p>
          <input
            style={{ width: "60px" }}
            type="text"
            // placeholder={weightTheyWeighedInAt}
            // defaultValue={props.registrationInfo.weight_they_weighed_in_at}
            onChange={(e: any) => {
              setWeightTheyWeighedInAt(e.target.value);
              setShowWieghtSubmitButton(true);
            }}
          />
          {showWieghtSubmitButton && weightTheyWeighedInAt && (
            <button className="btn-success" onClick={submitWeight}>
              Submit weight
            </button>
          )}
          {props.allWrestlersInDivision.weight_they_weighed_in_at > 0 && (
            <p style={{ color: "green" }}>
              wieghed-in:{" "}
              <strong>
                {props.allWrestlersInDivision.weight_they_weighed_in_at}
              </strong>
            </p>
          )}
        </div>
        <div
          className="phoneNumber-master-div"
          style={{
            display: editPopUpDisplay,
            width: "100%",
            height: "100&",
            opacity: "90%",
          }}
        >
          <div>
            <label htmlFor="">Phone:</label>
            <input
              onChange={(e: any) => {
                setPhoneNumber(e.target.value);
                setShowPhoneNumberButton(true);
              }}
              type="text"
              maxLength={10}
              placeholder="enter phone number"
            />
            {showPhoneNumberButton && phoneNumber?.length === 10 && (
              <button onClick={submitPhoneNumber} className="btn-info">
                Update phone
              </button>
            )}
          </div>
        </div>
        <hr
          className="m-3"
          style={{ backgroundColor: "black", height: "1px" }}
        />
      </div>
    );
  }
};

export default TableWorkerEditWrestlerInfo;

interface IProps {
  allWrestlersInDivision: IRegistrationInfoFromTableWorker;
  reRenderParent: Function;
}
