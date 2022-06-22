import * as React from "react";
import { IRegistrations } from "./registration/interfaces";
import EditSingleRegistrationOrWrestler from "./EditSingleRegistrationOrWrestler";

const EditAllWrestlersInEvent = (props: IProps) => {
  const [allRegistrationsForEvent, setAllRegistrationsForEvent] =
    React.useState<IRegistrations[]>();

  React.useEffect(() => {
    if (!props.divisionID) {
      fetch(`/api/registrations/getAllRegistrationsForEvent/${props.eventID}`)
        .then((res) => res.json())
        .then((res) => setAllRegistrationsForEvent(res));
    } else {
      //fetch for sepcific divion in the list of division menu
      //go over with jay to make sure this is okay and not able to run into problems
    }
  }, []);

  return (
    <div>
      <h3>List of Wrestlers:</h3>
      {allRegistrationsForEvent && (
        <div>
          {allRegistrationsForEvent.map((registrationInfo) => {
            return (
              <div key={registrationInfo.id}>
                <EditSingleRegistrationOrWrestler
                  registrationInfo={registrationInfo}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditAllWrestlersInEvent;

interface IProps {
  eventID: number | string;
  divisionID?: number | string;
}
