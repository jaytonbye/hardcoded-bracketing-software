import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.events.singleEvent(id));
    } else {
      res.json(await db.events.allEvents());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     let email = req.body.email;
//     let password = req.body.password;
//     let role = req.body.role;
//     let real_email = req.body.real_email;
//     let tenant = req.body.tenant;

//     res.json(
//       await db.users.createUser({ email, password, role, real_email, tenant })
//     );
//   } catch (error) {
//     console.log(req.body);
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// router.put("/", hasValidAdminToken, async (req, res) => {
//   try {
//     res.json(await db.users.updateUser(req.body));
//   } catch (error) {
//     console.log(error);
//     console.log("somethings messing up here");
//     res.sendStatus(500);
//   }
// });

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
