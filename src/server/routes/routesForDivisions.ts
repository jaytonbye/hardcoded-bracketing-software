import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

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

router.post("/", async (req, res) => {
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

// router.put("/", hasValidAdminToken, async (req, res) => {
//   try {
//     res.json(await db.users.updateUser(req.body));
//   } catch (error) {
//     console.log(error);
//     console.log("somethings messing up here");
//     res.sendStatus(500);
//   }
// });

router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db.divisions.deleteDivision(id);
<<<<<<< HEAD
    res.json(
      "hopefully deleted users after deleting corresponding personal_info and grades"
    );
=======
    res.json("Deleted the division!");
>>>>>>> waynesBranch
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
