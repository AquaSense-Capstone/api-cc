import Express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
const auth = Express.Router();

auth.post("/register", signup);
auth.post("/login", signin);

export default auth;
