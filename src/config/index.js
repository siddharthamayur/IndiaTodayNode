const APP_PORT = process.env.APP_PORT || 3000;
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  AWS_KEY,
  AWS_SECRET,
  AWS_REGION,
  S3BUCKET
} = process.env;

module.exports = {
  APP_PORT,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  AWS_KEY,
  AWS_SECRET,
  AWS_REGION,
  S3BUCKET,
};
