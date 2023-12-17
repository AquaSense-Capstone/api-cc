// import modules
import Express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import cors from "cors";
import multer from "multer";

// Import own code
import authRoute from "./src/routes/auth.route.js";

// starterrrrrpacckkkkkkkkkkkk
const app = Express();
const port = process.env.PORT || 8000;
const formData = multer();
const io = new Server(3001, {});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
// using multipart/form-data
app.use(formData.array());

app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
  res.send("howdyy");
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
