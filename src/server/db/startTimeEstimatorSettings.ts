import { Query } from "./index";

const allEstimators = async () => {
  return Query(`Select * from start_time_estimator_settings;`);
};

const singleEstimator = async (id: number) => {
  return Query(`Select * from start_time_estimator_settings WHERE id=?;`, [id]);
};

const createEstimator = async (
  userID: number,
  name: string,
  date: string, //why can't I use date here?
  location: string
) => {
  return Query(
    `
  INSERT INTO start_time_estimator_settings ()
VALUES (?,);
  `,
    [name, date, location, userID]
  );
};

const deleteEstimator = async (eventID: number) => {
  Query(`DELETE FROM start_time_estimator_settings WHERE event_id=?`, [
    eventID,
  ]);
};

export default {
  allEvents,
};
