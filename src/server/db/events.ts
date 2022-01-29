import { Query } from "./index";

const allEvents = async () => {
  return Query(`Select * from events;`);
};

const singleEvent = async (id: number) => {
  return Query(`Select * from events WHERE id=?;`, [id]);
};

const createEvent = async (
  userID: number,
  name: string,
  date: string, //why can't I use date here?
  location: string
) => {
  return Query(
    `
  INSERT INTO events (name_of_event, date_of_event, location_of_event, created_by_user)
VALUES (?,?,?,?);
  `,
    [name, date, location, userID]
  );
};

const deleteEvent = async (eventID: number) => {
  Query(`DELETE FROM events WHERE id=?`, [eventID]);
};

const deleteCorrespondingDivisions = async (eventID: number) => {
  return Query("DELETE FROM divisions WHERE event_id=?", [eventID]);
};

export default {
  allEvents,
  singleEvent,
  createEvent,
  deleteEvent,
  deleteCorrespondingDivisions,
};
