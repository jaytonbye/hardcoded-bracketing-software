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
  return Query(`Select * from bouts Where event_id=? and division_id=?;`, [
    eventID,
    divisionID,
  ]);
};

const singlebout = async (id: number) => {
  return Query(`Select * from bouts WHERE id=?;`, [id]);
};

const createbout = async (
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

export default {
  allBouts,
  allBoutsForSingleEvent,
  allBoutsForSingleEventAndSingleDivision,
  singlebout,
  createbout,
};
