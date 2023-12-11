import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;

  password = bcrypt.hashSync(password, 8);

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
      name,
      email,
      password,
    },
  });

  if (user) {
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: user,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userEmail) {
    return res.status(400).json({
      status: "failed",
      message: "email not found",
    });
  }

  const passwordValid = bcrypt.compareSync(password, userEmail.password);
  if (!passwordValid) {
    return res.status(400).json({
      status: "failed",
      message: "email or password incorrect!",
    });
  }

  const token = jwt.sign(
    {
      id: userEmail.id,
      email: userEmail.email,
    },
    process.env.JWT_SECRET
  );

  const data = {
    id: userEmail.id,
    email: userEmail.email,
    name: userEmail.name,
  };

  res.status(200).json({
    status: "success",
    message: "login success",
    token: token,
    data,
  });
};
