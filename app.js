// import modules
import Express from "express";

import authRoute from "./src/routes/auth.route.js";
import bodyParser from "body-parser";

// starterrrrr
const app = Express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
  res.send("hi there");
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
