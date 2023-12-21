import { Storage } from "@google-cloud/storage";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dateFormat from "dateformat";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const pathKey = path.resolve(__filename, "serviceaccount.json");
const bucketName = "aquasense-storage";
const gcs = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: pathKey,
});
const bucket = gcs.bucket(bucketName);

export const addReport = async (req, res, next) => {
  const { title, description, image } = req.body;
  try {
    if (!req.file) return next();

    bucket.upload(req.file.path, {});

    const imageName = randomUUID() + "-" + dateFormat(new Date(), "dd-mm-yyyy");
    const file = bucket.file(imageName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    const report = await prisma.report.create({
      data: {
        title,
        description,
        image: imageName,
      },
    });

    if (report) {
      res.status(201).json({
        status: "success",
        data: {
          report,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Data failed to send",
    });
  }
};

export const getReport = async (req, res) => {
  const reports = await prisma.report.findMany();

  return res.status(200).json({
    status: "success",
    data: reports,
  });
};
