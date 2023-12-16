// import modules
import Express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";

// Import own code
import authRoute from "./src/routes/auth.route.js";

// starterrrrrpacckkkkkkkkkkkk
const app = Express();
const port = process.env.PORT || 3000;
const io = new Server(3001, {});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
  res.send("hi there");
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
