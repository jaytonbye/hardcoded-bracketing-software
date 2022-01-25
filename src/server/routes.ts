import * as express from "express";
import routesForUsers from "./routes/routesForUsers";

import routesForSuccessfulLogins from "./routes/routesForSuccessfulLogins";
import { hasValidToken } from "./utils/tokenCheck";
import Contact from "./routes/Contact";
import routesForEvents from "./routes/routesForEvents";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.use("/users", routesForUsers);
router.use("/successfulLogins", routesForSuccessfulLogins);
router.use("/contact", Contact);
router.use("/events", routesForEvents);

export default router;
