import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello world");
});

router.post("/login", async (req, res) => {
  try {
    res.json({
      message: "Authorized",
      token: "ini token",
      users: "detail user",
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/register", (req, res) => {});

export default router;
