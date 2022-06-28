import { Router } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import db from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.json(await db.successful_logins.allLogins());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//not setup yet:
router.post("/", async (req, res) => {
  try {
    res.json(await db.successful_logins.userLoggedIn(req.body.user_id));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//harry added to get info from token couldnt find another way
router.get("/getInfoFromToken", (req, res) => {
  try {
    let token: any = req.headers.authorization?.split(" ")[1]; //removes bearer from the string
    let isValidToken = verify(token, config.jwt.secret);
    res.json(isValidToken);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
