let { mongoConnection } = require("../helpers/dbConnection");
const { MONGO_DB } = require("../config");
const { CustomError } = require("../helpers/error");
const uploadFileToS3 = require("../helpers/s3upoader");
const config = require("../config");
const axios = require("axios");
const userService = {
  /**
   * @name viewMyProfile
   * @description used to get user profile details by the user
   * @param data consisting payload
   */
  viewMyProfile: async (data) => {
    let client = await mongoConnection();
    try {
      let getUserDetails = await client
        .db(MONGO_DB)
        .collection("users")
        .findOne({ email: data.email });
      if (!getUserDetails) {
        throw new CustomError(400, "User not found.");
      }
      return getUserDetails;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  },
  /**
   * @name changeMyProfile
   * @description used to modify/add details in user profile
   * @param data consisting payload
   */
  changeMyProfile: async (data, image) => {
    let client = await mongoConnection();
    try {
      if (image) {
        s3_key = `users/${data.email}/${image.originalname}`;
        const s3_status = await uploadFileToS3({
          s3_key,
          imageBuffer: image.buffer,
        });
        data.imageURL = `https://${config.S3BUCKET}.s3.amazonaws.com/${s3_status.key}`;
      }
      let updatingUser = await client
        .db(MONGO_DB)
        .collection("users")
        .updateOne({ email: data.email }, { $set: data }, { upsert: true });
      if (updatingUser.acknowledged == true) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  },
    /**
   * @name getCountryCodes
   * @description used to get country codes
   */
     getCountryCodes: async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://country.io/phone.json`
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
};

module.exports = userService;
