const { CustomError } = require("../helpers/error");
const config = require("../config");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: config.AWS_KEY,
  secretAccessKey: config.AWS_SECRET,
  signatureVersion: "v4",
  region: config.AWS_REGION,
});

const s3 = new AWS.S3();
async function uploadFileToS3({ s3_key, imageBuffer }) {
  try {
    return new Promise(async (resolve, reject) => {
      const params = {
        Bucket: config.S3BUCKET,
        Key: s3_key,
        Body: imageBuffer,
        ACL:'public-read'
      };
      const uploadResult = s3.upload(params, function (s3err, data) {
        if (s3err) {
          reject(s3err);
        }
        resolve({ key: data.Key, location: data.Location });
      });
    }).catch((err) => {
      throw new CustomError(400, "Error while uploading image");
    });
  } catch (err) {
    throw err;
  }
}
module.exports = uploadFileToS3;
