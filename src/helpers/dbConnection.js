const { CustomError } = require("../helpers/error");
const { MongoClient } = require("mongodb");
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = require("../config");
async function mongoConnection() {
  const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:27017/${MONGO_DB}?authSource=admin`;
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  }).catch((err) => {
   throw new CustomError(500,"Error while connecting to Database")
  });

return client;
}

module.exports = { mongoConnection };
