import * as express from "express";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

export let hasValidToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  if (isValidToken) {
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
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let decoded: any = decode(token);
  let role = decoded.role;
  let isValidToken = verify(token, config.jwt.secret);

  if (
    isValidToken &&
    (role === "tableWorker" || role === "administrator" || role === "admin")
  ) {
    next();
  } else {
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
  let decoded: any = decode(token);
  let role = decoded.role;
  let isValidToken = verify(token, config.jwt.secret);

  if (isValidToken && (role === "administrator" || role === "admin")) {
    next();
  } else {
    res.status(401).json({
      message:
        "your token is not valid, or doesn't have event admin privlidges",
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
      message: "your token is not valid, or doesn't have admin privlidges",
    });
  }
};
