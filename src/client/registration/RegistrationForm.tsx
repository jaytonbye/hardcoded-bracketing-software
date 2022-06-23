import moment from "moment";
import * as React from "react";
import { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { IAllEvents, IAllDivisionsByEvent, IAllTeams } from "./interfaces";

const RegistrationForm = (props: IProps) => {
  let [firstName, setFirstName] = useState<string>();
  let [lastName, setLastName] = useState<string>();
  let [email, setEmail] = useState<string>();
  let [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  let [birthday, setBirthday] = useState<string>();
  let [teamId, setTeamId] = useState<string | number | null>();
  let [eventId, setEventId] = useState<string | number>();
  let [divisionId, setDivisionId] = useState<string | number>();
  let [allTeams, setAllTeams] = useState<IAllTeams[]>();
  let [allEvents, setAllEvents] = useState<IAllEvents[]>();
  let [eventDateDropDown, setEventDateDropDown] = useState<string>();
  let [allDivisionsBasedOnEventId, setAllDivisionsBasedOnEventId] = useState<
    IAllDivisionsByEvent[] | null
  >();

  useEffect(() => {
    fetch("/api/events/")
      .then((res) => res.json())
      .then((res) => setAllEvents(res));
    fetch("/api/teams/")
      .then((res) => res.json())
      .then((res) => setAllTeams(res));
  }, []);

  useEffect(() => {
    if (eventId) {
      fetch(`/api/divisions/divisionsByEventId/${eventId}`)
        .then((res) => res.json())
        .then((res) => setAllDivisionsBasedOnEventId(res));
      fetch(`/api/registrations/getDateOfEventByEventId/${eventId}`)
        .then((res) => {
          res.json();
        })
        .then((res:any) => {
          setEventDateDropDown(moment(res).format("MMMM, DD, YYYY"));
        });
    } else {
      setAllDivisionsBasedOnEventId(null);
      setEventDateDropDown("")
    }
  }, [eventId]);

  let checkRegistrationInfo = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthday ||
      // !teamId ||
      !eventId ||
      !divisionId
    ) {
      alert("Please complete entire form");
    } else {
      // go over this with jay to make sure it is good if input it "0000000000" Number(phoneNumber).length === 1
      //are teamname optional?
      if (
        !phoneNumber ||
        phoneNumber?.length === 0 ||
        (Number(phoneNumber) && phoneNumber?.length === 10)
      ) {
        submitRegistration();
      } else {
        alert(
          "Phone number must be 10 digits long and only contain numbers. Or left blank"
        );
      }
    }
  };

  let submitRegistration = () => {
    fetch(`/api/registrations/postNewRegistration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        birthday,
        teamId,
        eventId,
        divisionTheySignedUpFor: divisionId,
      }),
    }).then((res) => {
      if (res.ok) {
        alert(`You have successfully registered for event`);
        if (props.funcForRenderingFromEditAllWrestlers) {
          props.funcForRenderingFromEditAllWrestlers();
        }
      } else {
        alert("Something went wrong. your registration has not been accepted");
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center flex-wrap col-md-7 col-12 m-auto text-center"
      style={{ border: "1px solid black" }}
    >
      <div className="col-12 p-0 mt-3">
        <h3 className="text-center">
          <u>Register for an event</u>
        </h3>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">Event:</label>
          <select
            onChange={(e: any) => {
              setEventId(e.target.value);
              // console.log(e.target)
              // setEventDateDropDown(
              // console.log(e.target.id))
              // ;
            }}
            style={{
              width: "15rem",
            }}
          >
            <option
              value=""
              id=""
              // onClick={() => {
              //   setEventId("");
              //   setEventDateDropDown("");
              // }}
            ></option>
            {allEvents?.map((event) => {
              return (
                <option
                  key={event.id}
                  // onClick={() => {
                  // setEventId(event.id);
                  // setEventDateDropDown(
                  //   moment(event.date_of_event).format("MMMM, DD, YYYY")
                  // );
                  // }}
                  id={event.date_of_event}
                  value={event.id}
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
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">Division:</label>
          <select
            onChange={(e: any) => {
              setDivisionId(e.target.value);
            }}
            name=""
            id=""
          >
            <option
              // onClick={() => setDivisionId("")}
              value={""}
            ></option>
            {allDivisionsBasedOnEventId?.map((division) => {
              return (
                <option
                  // onClick={() => setDivisionId(division.id)}
                  key={division.id}
                  value={division.id}
                >
                  {division.name_of_division}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">Wrestlers first name:</label>
          <input
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="Wrestlers first name"
            maxLength={25}
          />
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">Wrestlers last name:</label>
          <input
            onChange={(e: any) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Wrestlers last name"
            maxLength={25}
          />
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">Email:</label>
          <input
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            maxLength={50}
          />
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">
            Phone number for text message notifications at the event:
          </label>
          <input
            onChange={(e: any) => {
              setPhoneNumber(e.target.value);
            }}
            type="text"
            maxLength={10}
            placeholder="5555555555"
          />
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">
            Birthday (be sure to select the year the wrestler was born):
          </label>
          <input
            onChange={(e: any) => {
              setBirthday(e.target.value);
            }}
            type="date"
          />
        </div>
        <div className="col-12 d-flex justify-content-center flex-wrap  mt-2 mb-2">
          <label className="m-0">Team name:</label>
          <select
            onChange={(e: any) => {
              setTeamId(e.target.value);
            }}
            name=""
            id=""
          >
            <option
              value=""
              // onClick={() => {
              //   setTeamId(null);
              // }}
            ></option>
            {allTeams?.map((team) => {
              return (
                <option
                  key={team.id}
                  // onClick={() => {
                  //   setTeamId(team.id);
                  // }}
                  value={team.id}
                >
                  {team.team_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button onClick={checkRegistrationInfo} className="btn btn-success">
            Submit registration
          </button>
        </div>
      </div>
      need to add stripe payment
    </div>
  );
};

export default RegistrationForm;

interface IProps {
  funcForRenderingFromEditAllWrestlers?: Function;
  isAdmin: boolean; //this makes it free 99
}
