import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  const { fullName, email } = req.body;
  let { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  // check if email already exists registered
  const checkUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (checkUser) {
    return res.status(409).json({
      status: "failed",
      message: "Email already exists!",
    });
  }

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password,
    },
  });

  if (user) {
    res,
      status(201).json({
        status: "success",
        message: "User created successfully!",
        data: user,
      });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const passwordValid = bcrypt.compareSync(password, userEmail.password);
};
