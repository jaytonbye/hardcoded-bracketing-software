import { Query } from "./index";

const allEstimators = async () => {
  return Query(`Select * from start_time_estimator_settings;`);
};

const mostRecenetEstimator = async (eventID: number) => {
  return Query(
    `select * from start_time_estimator_settings where event_id=?
  Order By date_created DESC limit 1;`,
    [eventID]
  );
};

const createEstimator = async (
  userID: number,
  eventID: number,
  startTimeOfEvent: any, //I think these can both be strings?
  endTimeOfEvent: any,
  averageMatchLength: number,
  desiredTimeBetweenMatches: number,
  lengthOfWeighIns: number,
  timeBetweenWeighInsAndWrestling: number,
  numberOfMatsAvailable: number
) => {
  return Query(
    `
    INSERT into start_time_estimator_settings (event_id, added_by_user_id, start_time_of_event,end_time_of_event,
        average_match_length,desired_time_between_matches,length_of_weigh_ins,time_between_weighins_and_wrestling,number_of_mats_available)
                values(?, ?,?,?,?,?,?,?,?);
  `,
    [
      eventID,
      userID,
      startTimeOfEvent,
      endTimeOfEvent,
      averageMatchLength,
      desiredTimeBetweenMatches,
      lengthOfWeighIns,
      timeBetweenWeighInsAndWrestling,
      numberOfMatsAvailable,
    ]
  );
};

const deleteEstimator = async (eventID: number) => {
  Query(`DELETE FROM start_time_estimator_settings WHERE event_id=?`, [
    eventID,
  ]);
};

export default {
  allEstimators,
  mostRecenetEstimator,
  createEstimator,
  deleteEstimator,
};
