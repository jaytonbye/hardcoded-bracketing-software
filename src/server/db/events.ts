import { Query } from "./index";

const allEvents = async () => {
  return Query(`Select * from events;`);
};

const singleEvent = async (id: number) => {
  return Query(`Select * from events WHERE id=?;`, [id]);
};

export default {
  allEvents,
  singleEvent,
};
