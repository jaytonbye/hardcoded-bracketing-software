import { json, Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

//GET
router.get("/getAllThatAreRegiatered", async (req, res) => {
  try {
    let allThatAreRegistered = await db.registrations.getAllThatAreRegistered();
    res.json(allThatAreRegistered);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/getAllRegistrationsForEvent/:eventId", async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let allRegistrationsForEvent =
      await db.registrations.getAllRegistrationsForEvent(eventId);
    res.json(allRegistrationsForEvent);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get(
  "/getAllRegistrationsForDivision/:eventId/:divisionId",
  async (req, res) => {
    try {
      let eventId = req.params.eventId;
      let divisionId = req.params.divisionId;
      let allRegistrationsForDivision =
        await db.registrations.getAllRegistrationsForDivision(
          eventId,
          divisionId
        );
      res.json(allRegistrationsForDivision);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.get("/getDateOfEventByEventId/:eventId", async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let dateOfEvent = await db.registrations.getDateOfEventByEventId(eventId);
    res.json(dateOfEvent);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

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

// PUTS
router.put("/updateRegistrationInfo", async (req, res) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    let email = req.body.email;
    let birthday = req.body.birthday;
    let teamId = req.body.teamId;
    let eventId = req.body.eventId;
    let divisionTheyAreCompetingAtId = req.body.divisionTheyAreCompetingAtId;
    let weightTheyWeighedInAt = req.body.weightTheyWeighedInAt;
    let registrationId = req.body.registrationId;
    let updateRegistrationInfo = await db.registrations.putEditRegistrationInfo(
      firstName,
      lastName,
      phoneNumber,
      email,
      birthday,
      teamId,
      eventId,
      divisionTheyAreCompetingAtId,
      weightTheyWeighedInAt,
      registrationId
    );
    res.sendStatus(200); //should probably catch errors here
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/updateRegistrationsWieght", async (req, res) => {
  try {
    let weight = req.body.weight;
    let registrationId = req.body.registrationId;
    let updateRegistrationWeight =
      await db.registrations.putEditRegistrationWeight(weight, registrationId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//DELETE
router.delete("/deleteSingleRegistration/:registrationId", async (req, res) => {
  try {
    let registrationId = req.params.registrationId;
    let deleteSingleRegistration =
      await db.registrations.deleteSingleRegistration(registrationId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
