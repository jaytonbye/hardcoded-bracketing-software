import { Query } from "./index";

const allLogins = async () => {
  return Query(`Select * from successful_logins
  ORDER BY successful_logins.created_at DESC LIMIT 200;`);
};

const userLoggedIn = async (user_id: number) => {
  return Query(`INSERT INTO successful_logins (user_id) VALUES (?);`, [
    user_id,
  ]);
};

export default {
  allLogins,
  userLoggedIn,
};
