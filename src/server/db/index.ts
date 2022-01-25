import * as mysql from "mysql";
import users from "./users";
import events from "./events";
import divisions from "./divisions";
import successful_logins from "./successful_logins";

import config from "../config";

export const Pool = mysql.createPool({
  connectionLimit: 10,
  host: config.db.host,
  port: Number(config.db.port),
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export const Query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Pool.query(query, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

export default {
  users,
  events,
  divisions,
  successful_logins,
};
