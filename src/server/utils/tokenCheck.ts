import * as express from "express";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

export let hasValidToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  if (isValidToken && req.headers.authorization.split(" ")[0] === "Bearer") {
    next();
  } else {
    res.status(401).json({ message: "your token is not valid" });
  }
};

export let hasValidTableWorkerToken: express.RequestHandler = (
  req,
  res,
  next
) => {
  try {
    let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
    let isValidToken: any = verify(token, config.jwt.secret);
    let role = isValidToken.role;
    console.log(req.body);
    if (
      (isValidToken &&
        (role === "tableWorker" || role === "administrator") &&
        req.body.eventID == Number(isValidToken.priviliges_for_event_ID)) ||
      (role === "admin" && isValidToken)
      // I used the == sign above, as I was having some trouble with the strings/numbers. For some reason req.body.eventID was coming in as a string.
    ) {
      next();
    } else {
      res.status(401).json({
        message:
          "your token is not valid, or doesn't have the privlidges required",
      });
    }
  } catch (error) {
    res.status(401).json({
      message:
        "your token is not valid, or doesn't have the privlidges required",
    });
  }
};

export let hasValidEventAdministratorToken: express.RequestHandler = (
  req,
  res,
  next
) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string

  let isValidToken: any = verify(token, config.jwt.secret);
  let role = isValidToken.role;
  if (isValidToken && (role === "administrator" || role === "admin")) {
    res.status(200);
    next();
  } else {
    res.status(401).json({
      message:
        "your token is not valid, or doesn't have event admin privileges",
    });
  }
};

export let hasValidAdminToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let decoded: any = decode(token);
  let role = decoded.role;
  let isValidToken = verify(token, config.jwt.secret);

  if (isValidToken && role === "admin") {

    next();
  } else {
    res.status(401).json({
      message: "your token is not valid, or doesn't have admin privileges",
    });
  }
};
