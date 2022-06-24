import * as express from "express";
import routesForUsers from "./routes/routesForUsers";

import routesForSuccessfulLogins from "./routes/routesForSuccessfulLogins";
import { hasValidToken } from "./utils/tokenCheck";
import Contact from "./routes/Contact";
import routesForEvents from "./routes/routesForEvents";
import routesForDivisions from "./routes/routesForDivisions";
import routesForTeams from "./routes/routesForTeams";
import routesForRegistrations from "./routes/routesForRegistrations";
import routesForBouts from "./routes/routesForBouts";
import routesForTwilio from "./routes/routesForTwilio";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.use("/users", routesForUsers);
router.use("/successfulLogins", routesForSuccessfulLogins);
router.use("/contact", Contact);
router.use("/events", routesForEvents);
router.use("/divisions", routesForDivisions);
router.use("/teams", routesForTeams);
router.use("/registrations", routesForRegistrations);
router.use("/bouts", routesForBouts);
router.use("/twilio", routesForTwilio);

export default router;
