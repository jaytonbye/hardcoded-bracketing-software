interface ISingleBoutInfoAfterPutThroughFuncforActualNames {
  bottomLineWrestlersActualName: string;
  bottomLineWrestlersActualTeamName: string;
  bottom_line_wrestler: string;
  created_at: string;
  created_by_user: string;
  dispatched: number | string;
  dispatched_to_mat: string | null | number;
  division_id: number | string;
  event_division_bout_concatenated: string;
  event_id: number | string;
  id: number | string | any;
  loser: string;
  match_number: number | string;
  round: number | string;
  score: string;
  time_bout_was_dispatched: number | string;
  topLineWrestlersActualName: string;
  topLineWrestlersActualTeamName: string;
  top_line_wrestler: string;
  winner: string | undefined | null | any;
}

interface ITableWorkerInfoFromToken {
  userId: number | string;
  email: string;
  role: string;
  priviliges_for_event_ID: number | string;
}

interface IRegistrationInfoFromTableWorker {
  id: number | string;
  first_name: string;
  last_name: string;
  team_id: number | string;
  event_id: number | string;
  division_they_signed_up_for_id: number | string;
  division_they_are_competing_at_id: number | string;
  weight_they_weighed_in_at: number | string;
  name_of_event: string;
  team_name: string;
  division_signed_up_for_name: string | number;
  division_competing_at_name: string | number;
}

export {
  ISingleBoutInfoAfterPutThroughFuncforActualNames,
  ITableWorkerInfoFromToken,
  IRegistrationInfoFromTableWorker,
};
