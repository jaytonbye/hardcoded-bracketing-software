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

const createDivision = async (
  userID: number,
  eventID: number,
  name: string,
  age: number,
  weight_class: string
) => {
  return Query(
    `
    INSERT INTO divisions (created_by_user, event_id, name_of_division, age, weight_class)
VALUES (?, ?, ?, ?,?);
    `,
    [userID, eventID, name, age, weight_class]
  );
};
const deleteDivision = async (divisionID: number) => {
  Query(`DELETE FROM divisions WHERE id=?`, [divisionID]);
};

export default {
  allDivisions,
  allDivisionsForSingleEvent,
  singleDivision,
  createDivision,
  deleteDivision,
};
