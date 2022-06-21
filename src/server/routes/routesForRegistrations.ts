import { json, Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

//POST
router.post("/postNewRegistration", async (req, res) => {
  try {
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let phoneNumber: string = req.body.phoneNumber;
    let email: string = req.body.email;
    let birthday: string = req.body.birthday;
    let teamId: number = req.body.teamId;
    let eventId: number = req.body.eventId;
    let divisionTheySignedUpFor: number = req.body.divisionTheySignedUpFor;
    await db.registrations.postNewRegistration(
      firstName,
      lastName,
      phoneNumber,
      email,
      birthday,
      teamId,
      eventId,
      divisionTheySignedUpFor
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
