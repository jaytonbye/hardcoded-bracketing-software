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
  dispatchedToMat: number,
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
  dispatchedToMat: number
) => {
  console.log({ boutID });
  return Query(
    `
    UPDATE bouts
    SET created_by_user=?, bottom_line_wrestler=?, dispatched=?,loser=?,score=?,top_line_wrestler=?,winner=?, dispatched_to_mat=?
    WHERE ID=?;
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

const dispatchBout = async (
  boutID: number,
  dispatched: string, //TS complained when I used boolean, let's see if this messes up the code...
  dispatchedToMat: number
) => {
  return Query(
    `
    UPDATE bouts
    SET dispatched=?, dispatched_to_mat=?
    WHERE ID=?;
    `,
    [dispatched, dispatchedToMat, boutID]
  );
};

//Not currently being ordered by anything. This is an annoying issue to solve! We obviously want to order it by match number, but we also want to order it by the divisions. Maybe I should simply order them by a timestamp of when they were dispatched? That is probably the easiest way.
const getAllDispatchedBouts = async (eventID: number, matNumber: number) => {
  return Query(
    `
    Select * from bouts
    WHERE event_id = ? AND dispatched = 1 AND dispatched_to_mat =?;
    `,
    [eventID, matNumber]
  );
};

const submitResult = async (
  boutID: number,
  userID: number,
  loser: string,
  score: string,
  winner: string
) => {
  return Query(
    `
    UPDATE bouts
    SET created_by_user=?, dispatched=0,loser=?,score=?,winner=?, dispatched_to_mat=null
    WHERE ID=?;
    `,
    [userID, loser, score, winner, boutID]
  );
};

const updateTopLineWrestlerOfDependantBoutsWithWinner = async (
  userID: number,
  winner: string,
  eventID: number,
  divisionID: number,
  matchNumber: number
) => {
  return Query(
    `
    update bouts
    set created_by_user=?, top_line_wrestler = ?
    WHERE event_id = ? and division_id=? and top_line_wrestler = '{"name":"winnerOfBout#?"}';
    `,
    [userID, winner, eventID, divisionID, matchNumber]
  );
};

const updateBottomLineWrestlerOfDependantBoutsWithWinner = async (
  userID: number,
  winner: string,
  eventID: number,
  divisionID: number,
  matchNumber: number
) => {
  return Query(
    `
    update bouts
    set created_by_user=?, bottom_line_wrestler = ?
    WHERE event_id = ? and division_id=? and bottom_line_wrestler = '{"name":"winnerOfBout#?"}';
    `,
    [userID, winner, eventID, divisionID, matchNumber]
  );
};

const updateTopLineWrestlerOfDependantBoutsWithLoser = async (
  userID: number,
  loser: string,
  eventID: number,
  divisionID: number,
  matchNumber: number
) => {
  return Query(
    `
    update bouts
    set created_by_user=?, top_line_wrestler = ?
    WHERE event_id = ? and division_id=? and top_line_wrestler = '{"name":"loserOfBout#?"}';
    `,
    [userID, loser, eventID, divisionID, matchNumber]
  );
};

const updateBottomLineWrestlerOfDependantBoutsWithLoser = async (
  userID: number,
  loser: string,
  eventID: number,
  divisionID: number,
  matchNumber: number
) => {
  return Query(
    `
    update bouts
    set created_by_user=?, bottom_line_wrestler = ?
    WHERE event_id = ? and division_id=? and bottom_line_wrestler = '{"name":"loserOfBout#?"}';
    `,
    [userID, loser, eventID, divisionID, matchNumber]
  );
};

export default {
  allBouts,
  allBoutsForSingleEvent,
  allBoutsForSingleEventAndSingleDivision,
  singleBout,
  createBout,
  editBout,
  dispatchBout,
  getAllDispatchedBouts,
  submitResult,
  updateTopLineWrestlerOfDependantBoutsWithWinner,
  updateTopLineWrestlerOfDependantBoutsWithLoser,
  updateBottomLineWrestlerOfDependantBoutsWithLoser,
  updateBottomLineWrestlerOfDependantBoutsWithWinner,
};
