import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.events.singleEvent(id));
    } else {
      res.json(await db.events.allEvents());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", hasValidAdminToken, async (req, res) => {
  try {
    let userID = req.body.userID;
    let name = req.body.name;
    let date = req.body.date;
    let location = req.body.location;

    res.json(await db.events.createEvent(userID, name, date, location));
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.sendStatus(500);
  }
});

// router.put("/", hasValidAdminToken, async (req, res) => {
//   try {
//     res.json(await db.users.updateUser(req.body));
//   } catch (error) {
//     console.log(error);
//     console.log("somethings messing up here");
//     res.sendStatus(500);
//   }
// });

router.delete("/:id", hasValidAdminToken, async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db.events.deleteCorrespondingBouts(id);
    await db.events.deleteCorrespondingDivisions(id);
    await db.events.deleteEvent(id);
    res.json(
      "hopefully deleted the event after deleting corresponding divisions"
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
