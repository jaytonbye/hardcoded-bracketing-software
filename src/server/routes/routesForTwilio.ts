import { json, Router } from "express";
import config from "../config";
import db from "../db";

const router = Router();

const twilioAccountSid = config.twilio.twilioAccountSid;
const twilioAuthToken = config.twilio.twilioAuthToken;
const twilioFromPhoneNumber = "+12177491354";
const client = require("twilio")(twilioAccountSid, twilioAuthToken);

//registration message
router.put("/twilioEventRegistrationSuccessful", async (req, res) => {
  try {
    let registrationPhoneNumber = req.body.registrationPhoneNumber;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let eventName = req.body.eventName;
    let eventDate = req.body.eventDate;
    let divisionName = req.body.divisionName;
    let eventLocation = req.body.eventLocation;
    client.messages
      .create({
        body: `${firstName} ${lastName} has registered for, ${eventName}, happening on ${eventDate} wrestling in the ${divisionName} division. Location: ${eventLocation}`,
        from: twilioFromPhoneNumber,
        to: `1${registrationPhoneNumber}`,
      })
      .then((message: any) => console.log(message))
      .catch((err: any) => console.log(err));
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// fetch("/api/twilio/twilioEventRegistrationSuccessful", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       registrationPhoneNumber: phoneNumber,
//       firstName,
//       lastName,
//       eventName: eventNameForText,
//       eventDate: eventDateDropDown,
//       divisionName: divisionNameForText,
//       eventLocation: eventLocationForText,
//     }),
//   });


//dispatch message
router.put("/twilioMatDispatchMessage", async (req, res) => {
  try {
    let wrestlerPhoneNumber = req.body.wrestlerPhoneNumber;
    let wrestlerName1 = req.body.wrestlerName1;
    let wrestlerName2 = req.body.wrestlerName2;
    let matNumber = req.body.matNumber;
    client.messages
      .create({
        body: `The match between ${wrestlerName1} & ${wrestlerName2} has been assigned to mat ${matNumber}`,
        from: twilioFromPhoneNumber,
        to: `1${wrestlerPhoneNumber}`,
      })
      .then((message: any) => console.log(message))
      .catch((err: any) => console.log(err));
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  // fetch("/api/twilio/twilioMatDispatchMessage", {method:"PUT",
  // headers: { "Content-Type": "application/json" },
  // body: JSON.stringify({
  //   wrestlerPhoneNumber:"5165249187",
  //   wrestlerName1:"bruhh1",
  //   wrestlerName2:"duuuuuuuh",
  //   matNumber:"3"
  // })
  // })


//result message
router.put("/twilioResultMessage", async (req, res) => {
  try {
    let wrestlerPhoneNumber = req.body.wrestlerPhoneNumber;
    let wrestlerName1Win = req.body.wrestlerName1Win;
    let wrestlerName2Loss = req.body.wrestlerName2Loss;
    client.messages.create({
      body: `Result: ${wrestlerName1Win} defeated ${wrestlerName2Loss} has been recorded. Please notify us if this is incorrect`,
      from: twilioFromPhoneNumber,
      to: `1${wrestlerPhoneNumber}`,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  //   fetch("/api/twilio/twilioResultMessage", {method:"PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     wrestlerPhoneNumber:"5165249187",
  //     wrestlerName1Win:"dude1 winner",
  //     wrestlerName2Loss:"dude2 loser"
  //   })
  // })


export default router;
