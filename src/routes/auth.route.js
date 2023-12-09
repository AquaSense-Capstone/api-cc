import Express from "express";
const auth = Express.Router();
import authController from "../controllers/auth.controller.js";

auth.post("/register", authController.register);
