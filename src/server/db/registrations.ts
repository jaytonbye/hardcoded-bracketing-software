import { Query } from "./index";

//GETS
// added for twilio but usefull
let getNameAndTeamNameOnly = async (eventId: string, divisionId: string) => {
  return Query(
    `
  select
  reg.id,
  reg.first_name,
  reg.last_name, 
  (select t.team_name from teams t
    where reg.team_id = t.id) as team_name
  from registrations reg
  join events e on reg.event_id = e.id
  where reg.event_id = ? and reg.division_they_are_competing_at_id = ?
`,
    [eventId, divisionId]
  );
};

let getSingleRegistrationInfo = async (registrationId: string | number) => {
  return Query(
    `
  select
reg.*,
e.name_of_event,
e.location_of_event,
e.date_of_event,
(select t.team_name from teams t
	where reg.team_id = t.id) as team_name,
(select d.name_of_division from divisions d
	where reg.division_they_signed_up_for_id = d.id)
	as division_signed_up_for_name,
(select d.name_of_division from divisions d
	where reg.division_they_are_competing_at_id = d.id
)
as division_competing_at_name
from registrations reg
join events e on reg.event_id = e.id
where reg.id = ?
  `,
    [registrationId]
  );
};
//

let getAllThatAreRegistered = async () => {
  return Query(`
  select
  reg.*,
  e.name_of_event,
  e.location_of_event,
  e.date_of_event,
  (select t.team_name from teams t
    where reg.team_id = t.id) as team_name,
  (select d.name_of_division from divisions d
    where reg.division_they_signed_up_for_id = d.id)
    as division_signed_up_for_name,
  (select d.name_of_division from divisions d
    where reg.division_they_are_competing_at_id = d.id
  )
  as division_competing_at_name
  from registrations reg
  join events e on reg.event_id = e.id
  order by division_competing_at_name;
  `);
};

let getAllRegistrationsForEvent = async (eventId: number | string | any) => {
  return Query(
    //   `
    // select * from registrations
    // where event_id = ?
    // order by division_they_are_competing_at_id;`,
    `select
  reg.*,
  e.name_of_event,
  (select t.team_name from teams t
    where reg.team_id = t.id) as team_name,
  (select d.name_of_division from divisions d
    where reg.division_they_signed_up_for_id = d.id)
    as division_signed_up_for_name,
  (select d.name_of_division from divisions d
    where reg.division_they_are_competing_at_id = d.id
  )
  as division_competing_at_name
  from registrations reg
  join events e on reg.event_id = e.id
  where reg.event_id = ? order by division_competing_at_name;`,
    [eventId]
  );
};

let getAllRegistrationsForDivision = async (
  eventId: string | number,
  divisionId: string | number
) => {
  return Query(
    `
  select
  reg.*,
  e.name_of_event,
  (select t.team_name from teams t
    where reg.team_id = t.id) as team_name,
  (select d.name_of_division from divisions d
    where reg.division_they_signed_up_for_id = d.id)
    as division_signed_up_for_name,
  (select d.name_of_division from divisions d
    where reg.division_they_are_competing_at_id = d.id
  )
  as division_competing_at_name
  from registrations reg
  join events e on reg.event_id = e.id
  where reg.event_id = ? and reg.division_they_are_competing_at_id = ?
   order by division_competing_at_name;
`,
    [eventId, divisionId]
  );
};

let getAllRegistrationsForDivisionForTableWorker = async (
  eventId: number | string,
  divisionId: string | number
) => {
  return Query(
    `
  select
  reg.id,
  reg.first_name,
  reg.last_name,
  reg.team_id,
  reg.event_id,
  reg.division_they_signed_up_for_id,
  reg.division_they_are_competing_at_id,
  reg.weight_they_weighed_in_at,
  e.name_of_event,
  (select t.team_name from teams t
    where reg.team_id = t.id) as team_name,
  (select d.name_of_division from divisions d
    where reg.division_they_signed_up_for_id = d.id)
    as division_signed_up_for_name,
  (select d.name_of_division from divisions d
    where reg.division_they_are_competing_at_id = d.id
  )
  as division_competing_at_name
  from registrations reg
  join events e on reg.event_id = e.id
  where reg.event_id = ? and reg.division_they_are_competing_at_id = ?;
  `,
    [eventId, divisionId]
  );
};

let getDateOfEventByEventId = async (eventId: string | number) => {
  return Query(`select date_of_event from events where id = ?;`, [eventId]);
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
        division_they_signed_up_for_id,
        division_they_are_competing_at_id)
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

//PUT
let putEditRegistrationInfo = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  birthday: string,
  teamId: string | number,
  eventId: string | number,
  divisionTheyAreCompetingAtId: string | number,
  weightTheyWeighedInAt: string | number,
  registrationId: string | number
) => {
  return Query(
    `
  update registrations
 set first_name = ?, last_name = ?,
 phone_number = ?, email = ?, 
 birthday = ?, team_id = ?, 
 event_id = ?, division_they_are_competing_at_id = ?, 
 weight_they_weighed_in_at = ?
 where id=?;
  `,
    [
      firstName,
      lastName,
      phoneNumber,
      email,
      birthday,
      teamId,
      eventId,
      divisionTheyAreCompetingAtId,
      weightTheyWeighedInAt,
      registrationId,
    ]
  );
};

let putEditRegistrationWeight = async (
  weight: string | number,
  registrationId: string | number
) => {
  await Query(
    `
  update registrations
  set weight_they_weighed_in_at = ?
  where id = ?;`,
    [weight, registrationId]
  );
};

let putEditRegistrationPhoneNumber = async (
  phoneNumber: string | number,
  registrationId: string | number
) => {
  await Query(
    `
  update registrations
  set phone_number = ?
  where id = ?;`,
    [phoneNumber, registrationId]
  );
};

//  DELETE
let deleteSingleRegistration = async (registrationId: string | number) => {
  await Query(`delete from registrations where id = ?;`, [registrationId]);
};

export default {
  //  GET
  getNameAndTeamNameOnly,
  getSingleRegistrationInfo,
  getAllThatAreRegistered,
  getAllRegistrationsForEvent,
  getAllRegistrationsForDivision,
  getAllRegistrationsForDivisionForTableWorker,
  getDateOfEventByEventId,
  //  POST
  postNewRegistration,
  // PUT
  putEditRegistrationInfo,
  putEditRegistrationWeight,
  putEditRegistrationPhoneNumber,
  //DELETE
  deleteSingleRegistration,
};
