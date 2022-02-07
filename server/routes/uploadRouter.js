import multer from "multer";
import express from "express";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const router = express.Router();
aws.config.update({
  accessKeyId: "AKIAUNMQM4DP3VFSTKGX",
  secretAccessKey: "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",
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: "shareme-bucket",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({
  storage: storageS3,
});
router.post("/", uploadS3.single("image"), (req, res) => {
  res.send(req.file.location);
});
export default router;
