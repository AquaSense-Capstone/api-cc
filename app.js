// import modules
import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";

// Import socket.io library
import { Server } from "socket.io";

// Import own code
import authRoute from "./src/routes/auth.route.js";
import reportRoute from "./src/routes/report.route.js";

// starterrrrrpacckkkkkkkkkkkk
const app = Express();
const ROUTE_PREFIX = "/api/v1";
const port = process.env.PORT || 8000;
const formData = multer();
const io = new Server(3001, {});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));

// using multipart/form-data
app.use(formData.array());

// API Route
app.use(`${ROUTE_PREFIX}/auth`, authRoute);
app.use(`${ROUTE_PREFIX}/report`, reportRoute);

// WEB Route
app.get("/", (req, res) => {
  res.send("howdyy");
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
