import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;

  try {
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
    const token = jwt.sign(
      {
        id: userEmail.id,
        email: userEmail.email,
      },
      process.env.JWT_SECRET
    );

    if (user) {
      res.status(201).json({
        status: "success",
        message: "User created successfully!",
        token: token,
        data: user,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Data cannot be null",
      status: "failed",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userEmail) {
      return res.status(401).json({
        status: "failed",
        message: "email not found",
      });
    }

    const passwordValid = bcrypt.compareSync(password, userEmail.password);
    if (!passwordValid) {
      return res.status(401).json({
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
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
      status: "failed",
    });
  }
};
