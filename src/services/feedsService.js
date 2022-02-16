let { mongoConnection } = require("../helpers/dbConnection");
const { MONGO_DB } = require("../config");
const { CustomError } = require("../helpers/error");
const moment = require("moment");
const findDifferentCombn = require("../helpers/findDiffComb");

const feedsService = {
  /**
   * @name getNewsFeed
   * @description used to get news feed on basis of sorting and filter
   * @param data consisting payload
   */
  getNewsFeed: async (data) => {
    let client = await mongoConnection();
    try {
      let { filter, orderBy, from, size } = data;
      let sortQuery = {};
      sortQuery["uploadedAt"] = orderBy == "asc" ? 1 : -1;
      let filterQuery = { $and: [] };
      for (const singleFilter in filter) {
        let obj = {};
        if (filter[singleFilter].length) {
          obj[singleFilter] = { $in: filter[singleFilter] };
          filterQuery.$and.push(obj);
        }
      }
      if (filterQuery.$and.length === 0) delete filterQuery.$and;
      let getNews = await client
        .db(MONGO_DB)
        .collection("feeds")
        .find(filterQuery)
        .sort(sortQuery)
        .limit(size)
        .skip(from)
        .toArray();
      let getCount = await client
        .db(MONGO_DB)
        .collection("feeds")
        .countDocuments(filterQuery);
      if (!getNews.length) {
        throw new CustomError(400, "No NEWS available");
      }
      getNews.map((singleNews) => {
        singleNews.uploadedAt = moment(singleNews.uploadedAt).fromNow();
      });
      return { newsFeed: getNews, count: getCount };
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  },
  /**
   * @name getFilters
   * @description used to get news filter
   * @param data consisting payload
   */
  getFilters: async () => {
    try {
      let technology = await findDifferentCombn.diffComb("technology");
      let author = await findDifferentCombn.diffComb("author");
      return { technology, author };
    } catch (err) {
      throw err;
    }
  },
};
module.exports = feedsService;
