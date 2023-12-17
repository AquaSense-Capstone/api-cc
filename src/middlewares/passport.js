import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const extractjwt = ExtractJwt;
const strategyjwt = Strategy;

passport.use(
  new strategyjwt(
    {
      jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      return prisma.user
        .findFirstOrThrow({
          where: { id: jwtPayload.id },
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
