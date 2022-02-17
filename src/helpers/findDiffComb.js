let { mongoConnection } = require("../helpers/dbConnection");
const { MONGO_DB } = require("../config");
const { CustomError } = require("../helpers/error");
let findDifferentCombn = {
    diffComb: async (filter) => {
      let client = await mongoConnection();
      try {
        let getDiffTechs = await client
          .db(MONGO_DB)
          .collection("feeds")
          .aggregate([{ $group: { _id: `$${filter}` } }])
          .toArray();
        let diffCombinations = [];
        if (getDiffTechs) {
          for (let obj of getDiffTechs) {
            diffCombinations.push(obj._id);
          }
        }
        return diffCombinations;
      } catch (err) {
        throw err;
      } finally {
        await client.close();
      }
    },
  };
  module.exports = findDifferentCombn;