import moment from "moment";
import * as React from "react";
import {
  IAllDivisionsByEvent,
  IAllEvents,
  IAllTeams,
  IRegistrations,
} from "./registration/interfaces";

//not scrollable if zoomed in or on mobile fix this or undo all the styles use width and height on divcheck for number lengths and shit
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
    moment(props.registrationInfo.birthday).format("YYYY-MM-DD")
  );
  let [teamId, setTeamId] = React.useState<string | number | null>(
    props.registrationInfo.team_id
  );
  let [eventId, setEventId] = React.useState<string | number | null>(
    props.registrationInfo.event_id
  );
  // let [divisionTheySignedUpFor, setDivisionTheySignedUpFor] = React.useState<
  //   string | number
  // >(props.registrationInfo.division_they_signed_up_for_id);
  let [divisionTheyAreCompetingAtId, setDivisionTheyAreCompetingAtId] =
    React.useState<string | number | null>(
      props.registrationInfo.division_they_are_competing_at_id
    );
  let [alldivisionsInEvent, setAlldivisionsInEvent] = React.useState<
    IAllDivisionsByEvent[] | null
  >();
  let [weightTheyWeighedInAt, setWeightTheyWeighedInAt] = React.useState<
    string | number | any
  >(props.registrationInfo.weight_they_weighed_in_at);
  //
  let [editPopUpDisplay, setEditPopUpDisplay] = React.useState<string>("none");
  let [showWieghtSubmitButton, setShowWieghtSubmitButton] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (editPopUpDisplay !== "none") {
      if (!eventId) {
        setAlldivisionsInEvent(null);
      } else {
        fetch(`/api/divisions/divisionsByEventId/${eventId}`)
          .then((res) => res.json())
          .then((res) => setAlldivisionsInEvent(res));
      }
    } else {
      // console.log("not yet");
    }
  }, [eventId, editPopUpDisplay]);

  let handleNameClick = () => {
    setEditPopUpDisplay("inline");
  };

  let handleGrayedOutDivClick = () => {
    setEditPopUpDisplay("none");
  };

  let submitWeight = () => {
    fetch(`/api/registrations/updateRegistrationsWieght`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weight: weightTheyWeighedInAt,
        registrationId: props.registrationInfo.id,
      }),
    }).then((res) => {
      if (res.ok) {
        alert(`Weigh-in successful`);
        setEditPopUpDisplay("none");
        setShowWieghtSubmitButton(false);
        props.funForReRenderFromEditAllWrestlers();
      } else {
        alert(
          "Something went wrong. Weigh-in failed. Make sure weight contains only numbers"
        );
      }
    });
  };

  let submitClicked = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthday ||
      !eventId ||
      !divisionTheyAreCompetingAtId
    ) {
      alert("Please complete entire form");
    } else {
      if (
        !phoneNumber ||
        phoneNumber?.length === 0 ||
        (Number(phoneNumber) && phoneNumber?.length === 10)
      ) {
        submitChanges();
      } else {
        alert(
          "Phone number must be 10 digits long and only contain numbers. Or left blank"
        );
      }
    }
  };
  let submitChanges = () => {
    fetch(`/api/registrations/updateRegistrationInfo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        birthday,
        teamId,
        eventId,
        divisionTheyAreCompetingAtId,
        weightTheyWeighedInAt:
          weightTheyWeighedInAt === "" ? null : weightTheyWeighedInAt,
        registrationId: props.registrationInfo.id,
      }),
    }).then((res) => {
      if (res.ok) {
        alert(`You have successfully updated info`);
        setEditPopUpDisplay("none");
        props.funForReRenderFromEditAllWrestlers();
      } else {
        alert("Something went wrong. Info failed to update");
      }
    });
  };

  ////////////////////////////////////////////////  HTML BELOW
  return (
    <div>
      <div>
        {props.registrationInfo && (
          <div className="d-flex justify-content-start align-items-center">
            <p className="btn-link m-1" onClick={handleNameClick}>
              {props.registrationInfo.first_name}{" "}
              {props.registrationInfo.last_name}
            </p>
            <input
              type="text"
              placeholder={weightTheyWeighedInAt}
              // defaultValue={props.registrationInfo.weight_they_weighed_in_at}
              onChange={(e: any) => {
                setWeightTheyWeighedInAt(e.target.value);
                setShowWieghtSubmitButton(true);
              }}
            />
            {showWieghtSubmitButton && (
              <button className="btn-success" onClick={submitWeight}>
                Submit weight
              </button>
            )}
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
            minHeight: "70%", //fix mobile scroll overslow with this
            minWidth: "70%",
            maxHeight: "100%", //fix mobile scroll overslow with this
            maxWidth: "100%",
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
          <input
            type="text"
            defaultValue={props.registrationInfo.first_name}
            onChange={(e: any) => setFirstName(e.target.value)}
          />
          <br />
          <label>
            <strong>Last name</strong>
          </label>{" "}
          <br />
          <input
            type="text"
            defaultValue={props.registrationInfo.last_name}
            onChange={(e: any) => setLastName(e.target.value)}
          />{" "}
          <br />
          <label>
            <strong>Phone number</strong>
          </label>{" "}
          <br />
          <input
            type="text"
            defaultValue={props.registrationInfo.phone_number}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
          />
          <br />
          <label>
            <strong>Email</strong>
          </label>{" "}
          <br />
          <input
            type="text"
            defaultValue={props.registrationInfo.email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <br />
          <label>
            <strong>Birthday</strong>
          </label>{" "}
          <br />
          <input
            type="date"
            defaultValue={moment(props.registrationInfo.birthday).format(
              "YYYY-MM-DD"
            )}
            onChange={(e: any) => setBirthday(e.target.value)}
          />
          <br />
          <label>
            <strong>Team</strong>
          </label>{" "}
          <br />
          <select defaultValue={props.registrationInfo.team_id}>
            <option
              value=""
              onClick={() => {
                setTeamId(null);
              }}
            ></option>
            {props.allTeams.map((team) => {
              return (
                <option
                  key={team.id}
                  value={team.id}
                  onClick={() => setTeamId(team.id)}
                >
                  {team.team_name}
                </option>
              );
            })}
          </select>
          <br />
          <label>
            <strong>event</strong>
          </label>{" "}
          <br />
          <select defaultValue={props.registrationInfo.event_id}>
            <option
              value=""
              onClick={() => {
                setEventId(null);
              }}
            ></option>
            {props.allEvents.map((event) => {
              return (
                <option
                  key={event.id}
                  value={event.id}
                  onClick={() => setEventId(event.id)}
                >
                  {event.name_of_event}
                </option>
              );
            })}
          </select>
          <br />
          <label>
            <strong>Division they signed up for</strong>
          </label>{" "}
          <br />
          {props.registrationInfo.division_signed_up_for_name}
          <br />
          <label>
            <strong>
              Division they are competing at <br />
              currently:{" "}
            </strong>{" "}
            {props.registrationInfo.division_competing_at_name}
          </label>{" "}
          <br />
          <select
          // defaultValue={props.registrationInfo.division_they_are_competing_at}
          >
            <option
              value=""
              onClick={() => setDivisionTheyAreCompetingAtId(null)}
            ></option>
            {alldivisionsInEvent?.map((division) => {
              return (
                <option
                  key={division.id}
                  value={division.id}
                  onClick={() => setDivisionTheyAreCompetingAtId(division.id)}
                >
                  {division.name_of_division}
                </option>
              );
            })}
          </select>
          {/* {divisionTheyAreCompetingAt}  */}
          <br />
          <label>
            <strong>Weight they weighed-in at</strong>
          </label>{" "}
          <br />
          <input
            type="text"
            // defaultValue={props.registrationInfo.weight_they_weighed_in_at}
            placeholder={weightTheyWeighedInAt}
            onChange={(e: any) => setWeightTheyWeighedInAt(e.target.value)}
          />
          <br />
          <div
            style={{ marginTop: "2rem" }}
            className="d-flex justify-content-center flex-wrap"
          >
            <button className="btn-success m-1" onClick={submitClicked}>
              Submit changes
            </button>
            <button
              className="btn-danger m-1"
              onClick={handleGrayedOutDivClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditSingleRegistrationOrWrestler;

interface IProps {
  registrationInfo: IRegistrations;
  allTeams: IAllTeams[];
  allEvents: IAllEvents[];
  funForReRenderFromEditAllWrestlers: Function;
}
