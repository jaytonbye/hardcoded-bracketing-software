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

const deleteCorrespondingBouts = async (divisionID: number) => {
  return Query("DELETE FROM bouts WHERE division_id=?", [divisionID]);
};

const updateDivisionWithItsBracketType = async (
  bracketType: string,
  divisionID: number
) => {
  //the reason we include "and bracket_type is null" is so we don't accidentally change the bracket type of a bracket that has already been built.
  return Query(
    `
  UPDATE divisions
SET bracket_type = ?
WHERE id=? and bracket_type is null;
  `,
    [bracketType, divisionID]
  );
};

export default {
  allDivisions,
  allDivisionsForSingleEvent,
  singleDivision,
  createDivision,
  deleteDivision,
  deleteCorrespondingBouts,
  updateDivisionWithItsBracketType,
};
