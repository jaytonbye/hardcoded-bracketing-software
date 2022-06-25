import { Router } from "express";
import db from "../db";
import { hasValidEventAdministratorToken } from "../utils/tokenCheck";

const router = Router();

router.get("/divisionsByEventId/:id?", async (req, res) => {
  let eventID = Number(req.params.id);
  try {
    if (eventID) {
      res.json(await db.divisions.allDivisionsForSingleEvent(eventID));
    } else {
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:id?", async (req, res) => {
  let divisionID = Number(req.params.id);
  try {
    if (divisionID) {
      res.json(await db.divisions.singleDivision(divisionID));
    } else {
      res.json(await db.divisions.allDivisions());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", hasValidEventAdministratorToken, async (req, res) => {
  try {
    let userID = req.body.userID;
    let eventID = req.body.eventID;
    let name = req.body.name;
    let age = req.body.age;
    let weight_class = req.body.weigh_class;

    res.json(
      await db.divisions.createDivision(
        userID,
        eventID,
        name,
        age,
        weight_class
      )
    );
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", hasValidEventAdministratorToken, async (req, res) => {
  try {
    let divisionID = req.body.divisionID;
    let bracketType = req.body.bracketType;
    res.json(
      await db.divisions.updateDivisionWithItsBracketType(
        bracketType,
        divisionID
      )
    );
  } catch (error) {
    console.log(error);
    console.log("somethings messing up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", hasValidEventAdministratorToken, async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db.divisions.deleteCorrespondingBouts(id);
    await db.divisions.deleteDivision(id);
    res.json("Deleted the division!");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get(
  "/findTheNumberOfCompetitorsInEachDivisionOfAnEvent/:id?",
  async (req, res) => {
    let eventID = Number(req.params.id);
    try {
      res.json(
        await db.divisions.findTheNumberOfCompetitorsInEachDivisionOfAnEvent(
          eventID
        )
      );
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

export default router;
