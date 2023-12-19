import Express from "express";
import passport from "passport";
import { addReport } from "../controllers/report.controller.js";
const report = Express.Router();

report.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addReport
);

export default report;
