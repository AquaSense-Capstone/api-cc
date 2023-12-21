import Express from "express";
import passport from "passport";
import { addReport, getReport } from "../controllers/report.controller.js";
const report = Express.Router();

report.post(
  "/reports",
  passport.authenticate("jwt", { session: false }),
  addReport
);

report.get(
  "/reports",
  passport.authenticate("jwt", { session: false }),
  getReport
);

export default report;
