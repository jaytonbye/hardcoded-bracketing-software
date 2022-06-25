import * as React from "react";
import {
  IRegistrations,
  IAllTeams,
  IAllEvents,
} from "../registration/interfaces";
import EditSingleRegistrationOrWrestler from "./EditSingleRegistrationOrWrestler";
import { Button, ButtonToolbar } from "react-bootstrap";
import RegistrationForm from "../registration/RegistrationForm";

const EditAllWrestlersOrAllInEventComponentStart = (props: IProps) => {
  const [showRegisterForAdminForm, setShowRegisterForAdminForm] =
    React.useState<boolean>(false);
  const [
    boolForRenderFromEditAllWrestlers,
    setboolForRenderFromEditAllWrestlers,
  ] = React.useState<boolean>(false);
  const [allRegistrationsForEvent, setAllRegistrationsForEvent] =
    React.useState<IRegistrations[]>();
  const [allTeams, setAllTeams] = React.useState<IAllTeams[]>();
  const [allEvents, setAllEvents] = React.useState<IAllEvents[]>();

  React.useEffect(() => {
    if (!props.divisionID && props.eventID) {
      fetch(`/api/registrations/getAllRegistrationsForEvent/${props.eventID}`)
        .then((res) => res.json())
        .then((res) => setAllRegistrationsForEvent(res));
      fetch(`/api/teams/`)
        .then((res) => res.json())
        .then((res) => setAllTeams(res));
      fetch(`/api/events/`)
        .then((res) => res.json())
        .then((res) => setAllEvents(res));
    } else if (props.divisionID && props.eventID) {
      fetch(
        `/api/registrations/getAllRegistrationsForDivision/${props.eventID}/${props.divisionID}`
      )
        .then((res) => res.json())
        .then((res) => setAllRegistrationsForEvent(res));
      fetch(`/api/teams/`)
        .then((res) => res.json())
        .then((res) => setAllTeams(res));
      fetch(`/api/events/`)
        .then((res) => res.json())
        .then((res) => setAllEvents(res));
      //fetch for sepcific divion in the list of division menu
      //go over with jay to make sure this is okay and not able to run into problems
    } else if (props.showAllThatAreRegistered) {
      fetch(`/api/registrations/getAllThatAreRegiatered`)
        .then((res) => res.json())
        .then((res) => setAllRegistrationsForEvent(res));
      fetch(`/api/teams/`)
        .then((res) => res.json())
        .then((res) => setAllTeams(res));
      fetch(`/api/events/`)
        .then((res) => res.json())
        .then((res) => setAllEvents(res));
    }
  }, [boolForRenderFromEditAllWrestlers]);

  let funcForRenderingFromEditAllWrestlers = () => {
    setboolForRenderFromEditAllWrestlers(!boolForRenderFromEditAllWrestlers);
  };

  let showRegisterForAdminFormFunc = () => {
    setShowRegisterForAdminForm(!showRegisterForAdminForm);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {props.showAllThatAreRegistered && (
        <button className="btn btn-info" onClick={showRegisterForAdminFormFunc}>
          Register someone for an event
        </button>
      )}
      {showRegisterForAdminForm && (
        <RegistrationForm
          funcForRenderingFromEditAllWrestlers={
            funcForRenderingFromEditAllWrestlers
          }
          isAdmin={true}
        />
      )}
      <h3>List of Wrestlers:</h3>
      {allRegistrationsForEvent && allEvents && allTeams && (
        <div>
          {allRegistrationsForEvent.map((registrationInfo) => {
            return (
              <div key={registrationInfo.id}>
                <EditSingleRegistrationOrWrestler
                  registrationInfo={registrationInfo}
                  allTeams={allTeams}
                  allEvents={allEvents}
                  funForReRenderFromEditAllWrestlers={
                    funcForRenderingFromEditAllWrestlers
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditAllWrestlersOrAllInEventComponentStart;

interface IProps {
  eventID?: number | string;
  divisionID?: number | string;
  showAllThatAreRegistered?: boolean;
}
