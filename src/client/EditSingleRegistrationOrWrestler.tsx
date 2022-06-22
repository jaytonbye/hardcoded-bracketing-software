import * as React from "react";
import { IRegistrations } from "./registration/interfaces";

//not scrollable if zoomed in or on mobile fix this or undo all the styles use width and height on div
const EditSingleRegistrationOrWrestler = (props: IProps) => {
  //fields to edit
  let [firstName, setFirstName] = React.useState<string>(
    props.registrationInfo.first_name
  );
  let [lastName, setLastName] = React.useState<string>(
    props.registrationInfo.last_name
  );
  let [phoneNumber, setPhoneNumber] = React.useState<string>(
    props.registrationInfo.phone_number
  );
  let [email, setEmail] = React.useState<string>(props.registrationInfo.email);
  let [birthday, setBirthday] = React.useState<string>(
    props.registrationInfo.birthday
  );
  let [teamId, setTeamId] = React.useState<string | number>(
    props.registrationInfo.team_id
  );
  let [eventId, setEventId] = React.useState<string | number>(
    props.registrationInfo.event_id
  );
  let [divisionTheySignedUpFor, setDivisionTheySignedUpFor] = React.useState<
    string | number
  >(props.registrationInfo.division_they_signed_up_for);
  let [divisionTheyAreCompetingAt, setDivisionTheyAreCompetingAt] =
    React.useState<string | number>(
      props.registrationInfo.division_they_are_competing_at
    );
  let [weightTheyAreCompetingAt, setWeightTheyAreCompetingAt] = React.useState<
    string | number
  >(props.registrationInfo.weight_they_weighed_in_at);
  //
  let [editPopUpDisplay, setEditPopUpDisplay] = React.useState<string>("none");

  let handleNameClick = () => {
    setEditPopUpDisplay("inline");
  };

  let handleGrayedOutDivClick = () => {
    setEditPopUpDisplay("none");
  };

  return (
    <div>
      <div>
        {props.registrationInfo && (
          <div>
            <p className="btn-link m-1" onClick={handleNameClick}>
              {props.registrationInfo.first_name}{" "}
              {props.registrationInfo.last_name}
            </p>
          </div>
        )}
      </div>
      <div
        className="hidden-popout"
        style={{
          top: "0",
          background: "black",
          opacity: "95%",
          display: `${editPopUpDisplay}`,
          position: "fixed",
          zIndex: 2,
          height: "100%",
          width: "100%",
        }}
      >
        <button
          onClick={handleGrayedOutDivClick}
          style={{ height: "100%", width: "100%", backgroundColor: "gray" }}
        ></button>
        <div
          className="hidden-popout-inner-with-info"
          style={{
            height: "80%", //fix mobile scroll overslow with this
            width: "80%",
            overflow: "scroll",
            padding: "1rem",
            zIndex: 20,
            opacity: "100%",
            backgroundColor: "white",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <label>
            <strong>First name</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.first_name} <br />
          <label>
            <strong>Last name</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.last_name} <br />
          <label>
            <strong>Phone number</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.phone_number} <br />
          <label>
            <strong>Email</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.email} <br />
          <label>
            <strong>Birthday</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.birthday} <br />
          <label>
            <strong>Team ID(want name instead?)</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.team_id} <br />
          <label>
            <strong>event ID (name instead?)</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.event_id} <br />
          <label>
            <strong>
              Division they signed up for(this is the ID right now)
            </strong>
          </label>{" "}
          <br />
          {props.registrationInfo.division_they_signed_up_for} <br />
          <label>
            <strong>
              Division they are competing at(this is the ID right now)
            </strong>
          </label>{" "}
          <br />
          {props.registrationInfo.division_they_are_competing_at} <br />
          <label>
            <strong>Weight they weighed-in at</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.weight_they_weighed_in_at} <br />
        </div>
      </div>
    </div>
  );
};
export default EditSingleRegistrationOrWrestler;

interface IProps {
  registrationInfo: IRegistrations;
}
