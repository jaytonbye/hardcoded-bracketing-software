import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

// router.get("/divisionsByEventId/:id?", async (req, res) => {
//   let eventID = Number(req.params.id);
//   try {
//     if (eventID) {
//       res.json(await db.divisions.allDivisionsForSingleEvent(eventID));
//     } else {
//     }
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

router.get("/:id?", async (req, res) => {
  let boutID = Number(req.params.id);
  try {
    if (boutID) {
      res.json(await db.bouts.singleBout(boutID));
    } else {
      res.json(await db.bouts.allBouts());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get(
  "/boutsByEventAndDivision/:eventID&:divisionID",
  async (req, res) => {
    let eventID = Number(req.params.eventID);
    let divisionID = Number(req.params.divisionID);

    try {
      res.json(
        await db.bouts.allBoutsForSingleEventAndSingleDivision(
          eventID,
          divisionID
        )
      );
    } catch (error) {
      console.log(req.body);
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.post("/", async (req, res) => {
  try {
    let userID = req.body.userID;
    let eventID = req.body.eventID;
    let divisionID = req.body.divisionID;
    let bottomLineWrestler = req.body.bottomLineWrestler;
    let dispatched = req.body.dispatched;
    let loser = req.body.loser;
    let matchNumber = req.body.matchNumber;
    let round = req.body.round;
    let score = req.body.score;
    let topLineWrestler = req.body.topLineWrestler;
    let winner = req.body.winner;
    let dispatchedToMat = req.body.dispatchedToMat;
    let eventDivisionBoutConcatenated = `e${eventID}d${divisionID}b${matchNumber}`;

    res.json(
      await db.bouts.createBout(
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
        eventDivisionBoutConcatenated
      )
    );
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    let boutID = req.body.boutID;
    let userID = req.body.userID;
    let bottomLineWrestler = req.body.bottomLineWrestler;
    let dispatched = req.body.dispatched;
    let loser = req.body.loser;
    let score = req.body.score;
    let topLineWrestler = req.body.topLineWrestler;
    let winner = req.body.winner;
    let dispatchedToMat = req.body.dispatchedToMat;

    res.json(
      await db.bouts.editBout(
        boutID,
        userID,
        bottomLineWrestler,
        dispatched,
        loser,
        score,
        topLineWrestler,
        winner,
        dispatchedToMat
      )
    );
  } catch (error) {
    console.log(error);
    console.log("somethings messing up here");
    res.sendStatus(500);
  }
});

router.put("/dispatch", async (req, res) => {
  try {
    let boutID = req.body.boutID;
    let dispatched = req.body.dispatched;
    let dispatchedToMat = req.body.dispatchedToMat;

    res.json(await db.bouts.dispatchBout(boutID, dispatched, dispatchedToMat));
  } catch (error) {
    console.log(error);
    console.log("somethings messing up here");
    res.sendStatus(500);
  }
});

// router.delete("/:id", hasValidAdminToken, async (req, res) => {
//   let id = Number(req.params.id);
//   try {
//     await db.users.deleteUser(id);
//     res.json(
//       "hopefully deleted users after deleting corresponding personal_info and grades"
//     );
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

export default router;
