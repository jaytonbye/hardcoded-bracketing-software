import moment from "moment";
import * as React from "react";
import {
  IAllDivisionsByEvent,
  IAllEvents,
  IAllTeams,
  IRegistrations,
} from "./interfaces";

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
  let [eventDateDropDown, setEventDateDropDown] = React.useState<string>();
  let [editPopUpDisplay, setEditPopUpDisplay] = React.useState<string>("none");
  let [showWieghtSubmitButton, setShowWieghtSubmitButton] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (editPopUpDisplay !== "none") {
      if (!eventId) {
        setDivisionTheyAreCompetingAtId(null);
        setAlldivisionsInEvent(null);
        setEventDateDropDown("");
      } else {
        fetch(`/api/divisions/divisionsByEventId/${eventId}`)
          .then((res) => res.json())
          .then((res) => setAlldivisionsInEvent(res));
        fetch(`/api/registrations/getDateOfEventByEventId/${eventId}`)
          .then((res) => res.json())
          .then((res: any) => {
            setEventDateDropDown(
              moment(res[0].date_of_event).format("MMMM, DD, YYYY")
            );
          });
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
        weight: weightTheyWeighedInAt === "" ? null : weightTheyWeighedInAt,
        registrationId: props.registrationInfo.id,
      }),
    }).then((res) => {
      if (res.ok) {
        alert(`Weigh-in successful`);
        setEditPopUpDisplay("none");
        setShowWieghtSubmitButton(false);
        //this removes the text from the input field after it is submitted i can remove this if we have probelms
        // let wieghtInput:any = document.getElementById("submitWeightInput")
        // wieghtInput.value = ""
        // setWeightTheyWeighedInAt("")
        //
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
        teamId: teamId === "" ? null : teamId,
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

  let deleteRegistrationFunc = () => {
    let areYouSure = confirm(
      "Are you sure you want to delete this registration?"
    );
    if (areYouSure) {
      fetch(
        `/api/registrations/deleteSingleRegistration/${props.registrationInfo.id}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        if (res.ok) {
          alert(`Registration has been deleted`);
          setEditPopUpDisplay("none");
          props.funForReRenderFromEditAllWrestlers();
        } else {
          alert("Something went wrong. Failed to delete registration");
        }
      });
    }
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
              // id="submitWeightInput"
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
            {props.registrationInfo.weight_they_weighed_in_at > 0 && (
              <p>
                wieghed-in: {props.registrationInfo.weight_they_weighed_in_at}
              </p>
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
            maxLength={25}
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
            maxLength={25}
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
            maxLength={10}
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
            maxLength={50}
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
          <select
            defaultValue={props.registrationInfo.team_id}
            onChange={(e: any) => {
              setTeamId(e.target.value);
            }}
          >
            <option
              value=""
              // onClick={() => {
              //   setTeamId(null);
              // }}
            ></option>
            {props.allTeams.map((team) => {
              return (
                <option
                  key={team.id}
                  value={team.id}
                  // onClick={() => setTeamId(team.id)}
                >
                  {team.team_name}
                </option>
              );
            })}
          </select>
          <br />
          <label>
            <strong>Event</strong>
          </label>{" "}
          <br />
          <select
            onChange={(e: any) => {
              setEventId(e.target.value);
            }}
            defaultValue={props.registrationInfo.event_id}
          >
            <option
              value=""
              // onClick={() => {
              //   setEventId(null);
              // }}
            ></option>
            {props.allEvents.map((event) => {
              return (
                <option
                  key={event.id}
                  value={event.id}
                  // onClick={() => setEventId(event.id)}
                >
                  {event.name_of_event}
                </option>
              );
            })}
          </select>
          {eventDateDropDown && (
            <label className="col-12">
              <strong>Event date:</strong> {eventDateDropDown}
            </label>
          )}
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
            onChange={(e: any) => {
              setDivisionTheyAreCompetingAtId(e.target.value);
            }}
          >
            <option
              value=""
              // onClick={() => setDivisionTheyAreCompetingAtId(null)}
            ></option>
            {alldivisionsInEvent?.map((division) => {
              return (
                <option
                  key={division.id}
                  value={division.id}
                  // onClick={() => setDivisionTheyAreCompetingAtId(division.id)}
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
          <div
            style={{ marginTop: "2rem" }}
            className="d-flex justify-content-center"
          >
            <button onClick={deleteRegistrationFunc} className="btn-danger">
              Delete registration
            </button>
          </div>
        </div>
      </div>
          <hr className="m-0" />
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