interface IAllEvents {
  id: number | string;
  created_by_user: number;
  name_of_event: string;
  date_of_event: string;
  location_of_event: string;
  created_at: string;
}

interface IAllDivisionsByEvent {
  id: number | string;
  created_by_user: number | string;
  event_id: number | string;
  name_of_division: number | string;
  age: number | string;
  weight_class: number | string;
  created_at: string;
  bracket_type: string;
}

interface IAllTeams {
  id: number | string;
  team_name: string;
  date_created: string;
}

interface IRegistrations {
  id: number | string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  birthday: string;
  team_id: number | string;
  event_id: number | string;
  division_they_signed_up_for_id: number | string;
  division_they_are_competing_at_id: number | string;
  weight_they_weighed_in_at: number | string;
  date_created: string;
  name_of_event: string;
  location_of_event: string;
  date_of_event: string;
  team_name: string;
  division_signed_up_for_name: string | number;
  division_competing_at_name: string | number;
}

// interface IRegistrations {
//   id: number | string;
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   email: string;
//   birthday: string;
//   team_id: number | string;
//   event_id: number | string;
//   division_they_signed_up_for_id: number | string;
//   division_they_are_competing_at_id: number | string;
//   weight_they_weighed_in_at: number | string;
//   date_created: string;
//   name_of_event: string;
//   team_name: string;
//   division_signed_up_for_name: string | number;
//   division_competing_at_name: string | number;
// }

export {
  IAllEvents,
  IAllDivisionsByEvent,
  IAllTeams,
  // ISingleRegistration,
  IRegistrations,
};
