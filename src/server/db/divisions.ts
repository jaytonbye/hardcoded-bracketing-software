import { Query } from "./index";

const allDivisions = async () => {
  return Query(`Select * from divisions;`);
};

const allDivisionsForSingleEvent = async (eventID: number) => {
  return Query(`Select * from divisions WHERE event_id=?;`, [eventID]);
};

const singleDivision = async (id: number) => {
  return Query(`Select * from divisions WHERE id=?;`, [id]);
};

export default {
  allDivisions,
  allDivisionsForSingleEvent,
  singleDivision,
};
