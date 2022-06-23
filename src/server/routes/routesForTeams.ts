import { Router } from "express";
import db from "../db";
import { hasValidEventAdministratorToken } from "../utils/tokenCheck";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let allTeams = await db.teams.getAllTeams();
    res.json(allTeams);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
