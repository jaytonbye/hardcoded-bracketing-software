import { Query } from "./index";

let getAllTeams = async () => {
  return Query(`SELECT * FROM teams`);
};

export default { getAllTeams };
