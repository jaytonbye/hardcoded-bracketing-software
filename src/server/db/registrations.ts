import { Query } from "./index";

//GETS
let getAllRegistrationsForEvent = async (eventId: number | string) => {
  return Query(
    `
  select * from registrations 
  where event_id = ? 
  order by division_they_are_competing_at;`,
    [eventId]
  );
};

//post
let postNewRegistration = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  birthday: string,
  teamId: number,
  eventId: number,
  divisionSignedUpFor: number
) => {
  return Query(
    `
    insert into registrations(first_name, last_name, 
        phone_number, email, birthday, 
        team_id, event_id, 
        division_they_signed_up_for,
        division_they_are_competing_at)
        values(?,?,?,?,?,?,?,?,?)
    `,
    [
      firstName,
      lastName,
      phoneNumber,
      email,
      birthday,
      teamId,
      eventId,
      divisionSignedUpFor,
      divisionSignedUpFor,
    ]
  );
};

export default {
  //  GET
  getAllRegistrationsForEvent,
  //  POST
  postNewRegistration,
};
