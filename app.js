// import modules
import Express from "express";
import router from "./src/routes/route.js";

// starterrrrr
const app = Express();
const port = 3000;

app.use("/", router);
app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
