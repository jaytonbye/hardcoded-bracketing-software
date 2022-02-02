import { Query } from "./index";
import router from "../routes/routesForEvents";

const allBouts = async () => {
  return Query(`Select * from bouts;`);
};

const allBoutsForSingleEvent = async (eventID: number) => {
  return Query(`Select * from bouts WHERE event_id=?;`, [eventID]);
};

const allBoutsForSingleEventAndSingleDivision = async (
  eventID: number,
  divisionID: number
) => {
  return Query(
    `Select * from bouts Where event_id=? and division_id=? ORDER BY match_number;`,
    [eventID, divisionID]
  );
};

const singleBout = async (id: number) => {
  return Query(`Select * from bouts WHERE id=?;`, [id]);
};

const createBout = async (
  userID: number,
  eventID: number,
  divisionID: number,
  bottomLineWrestler: string,
  dispatched: string, //TS complained when I used boolean, let's see if this messes up the code...
  loser: string,
  matchNumber: number,
  round: number,
  score: string,
  topLineWrestler: string,
  winner: string,
  dispatchedToMat: string,
  eventDivisionBoutConcatenated: string
) => {
  return Query(
    `
    INSERT INTO bouts (created_by_user, event_id, division_id, bottom_line_wrestler, dispatched, loser, match_number, round, score, top_line_wrestler, winner, dispatched_to_mat, event_division_bout_concatenated)
VALUES (?, ?, ?, ?,?,?, ?, ?, ?,?,?,?, ?);
    `,
    [
      userID,
      eventID,
      divisionID,
      bottomLineWrestler,
      dispatched,
      loser,
      matchNumber,
      round,
      score,
      topLineWrestler,
      winner,
      dispatchedToMat,
      eventDivisionBoutConcatenated,
    ]
  );
};

const editBout = async (
  boutID: number,
  userID: number,
  bottomLineWrestler: string,
  dispatched: string, //TS complained when I used boolean, let's see if this messes up the code...
  loser: string,
  score: string,
  topLineWrestler: string,
  winner: string,
  dispatchedToMat: string
) => {
  return Query(
    `
    UPDATE bouts
    SET created_by_user=?, bottom_line_wrestler=?, dispatched=?,loser=?,score=?,top_line_wrestler=?,winner=?, dispatched_to_mat=?
    WHERE boutID=?;
    `,
    [
      userID,
      bottomLineWrestler,
      dispatched,
      loser,
      score,
      topLineWrestler,
      winner,
      dispatchedToMat,
      boutID,
    ]
  );
};

export default {
  allBouts,
  allBoutsForSingleEvent,
  allBoutsForSingleEventAndSingleDivision,
  singleBout,
  createBout,
  editBout,
};
