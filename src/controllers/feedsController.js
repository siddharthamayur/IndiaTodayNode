const Joi = require("@hapi/joi");
const feedsServices = require("../services/feedsService");
const { CustomError } = require("../helpers/error");
const findDifferentCombn = require("../helpers/findDiffComb");
const feedsController = {
  /**
   * @name getNewsFeed
   * @description used to view news feed based on filter and sorting
   * ```
   *  URL: /feeds/getNewsFeed
   *  METHOD: GET
   * ```
   */
  getNewsFeed: async (req, res, next) => {
    try {
      let techArr = await findDifferentCombn.diffComb("technology");
      let authorArr = await findDifferentCombn.diffComb("author");
      const dto = { ...req.body, ...req.query };
      const { error, value } = Joi.object({
        from: Joi.number().optional().default(0),
        size: Joi.number().min(1).optional().default(10),
        orderBy: Joi.valid("asc", "desc").optional(),
        filter: {
          technology: Joi.array()
            .items(
              Joi.string()
                .valid(...techArr)
                .optional()
            )
            .optional(),
          author: Joi.array()
            .items(
              Joi.string()
                .valid(...authorArr)
                .optional()
            )
            .optional(),
        },
      }).validate(dto);
      if (error) {
        throw new CustomError(400, error.details[0].message);
      } else {
        const result = await feedsServices.getNewsFeed(value);
        if (result) {
          res.json({
            success: true,
            message: "News feed fetched successfully.",
            data: result,
          });
        } else {
          res.json({
            success: false,
            message: "Error while fetching news feed.",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },
    /**
   * @name getFilters
   * @description used to get news filter 
   * ```
   *  URL: /feeds/getFilters
   *  METHOD: GET
   * ```
   */
     getFilters: async (req, res, next) => {
      try {
        const dto = { ...req.body, ...req.query };
        const { error, value } = Joi.object({
        }).validate(dto);
        if (error) {
          throw new CustomError(400, error.details[0].message);
        } else {
          const result = await feedsServices.getFilters();
          if (result) {
            res.json({
              success: true,
              message: "News filters fetched successfully.",
              data: result,
            });
          } else {
            res.json({
              success: false,
              message: "Error while fetching news filters.",
            });
          }
        }
      } catch (err) {
        next(err);
      }
    },
};

module.exports = feedsController;
