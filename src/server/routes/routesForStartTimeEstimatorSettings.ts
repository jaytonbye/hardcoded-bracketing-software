import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.startTimeEstimatorSettings.mostRecenetEstimator);
    } else {
      res.json(await db.startTimeEstimatorSettings.allEstimators());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", hasValidAdminToken, async (req, res) => {
  try {
    let userID = req.body.userID;
    let eventID = req.body.eventID;
    let startTimeOfEvent = req.body.startTimeOfEvent;
    let endTimeOfEvent = req.body.endTimeOfEvent;
    let averageMatchLength = req.body.averageMatchLength;
    let desiredTimeBetweenMatches = req.body.desiredTimeBetweenMatches;
    let lengthOfWeighIns = req.body.lengthOfWeighIns;
    let timeBetweenWeighInsAndWrestling =
      req.body.timeBetweenWeighInsAndWrestling;
    let numberOfMatsAvailable = req.body.numberOfMatsAvailable;

    res.json(
      await db.startTimeEstimatorSettings.createEstimator(
        userID,
        eventID,
        startTimeOfEvent,
        endTimeOfEvent,
        averageMatchLength,
        desiredTimeBetweenMatches,
        lengthOfWeighIns,
        timeBetweenWeighInsAndWrestling,
        numberOfMatsAvailable
      )
    );
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.sendStatus(500);
  }
});

// router.delete("/:id", hasValidAdminToken, async (req, res) => {
//   let id = Number(req.params.id);
//   try {
//     await db.events.deleteCorrespondingBouts(id);
//     await db.events.deleteCorrespondingDivisions(id);
//     await db.events.deleteEvent(id);
//     res.json("deletion process???");
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

export default router;
