const Joi = require("@hapi/joi");
const { CustomError } = require("../helpers/error");
const userService = require("../services/userService");
const userController = {
  /**
   * @name viewMyProfile
   * @description used to view own profile details by the user
   * ```
   *  URL: /user/viewMyProfile
   *  METHOD: GET
   * ```
   */
  viewMyProfile: async (req, res, next) => {
    try {
      const dto = { ...req.body, ...req.query };
      const { error, value } = Joi.object({
        email: Joi.string().email().required(),
      }).validate(dto);
      if (error) {
        throw new CustomError(400, error.details[0].message);
      } else {
        const result = await userService.viewMyProfile(value);
        if (result) {
          res.json({
            success: true,
            message: "User profile details fetched successfully.",
            data: result,
          });
        } else {
          res.json({
            success: false,
            message: "Error while fetching user profile details.",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },
  /**
   * @name changeMyProfile
   * @description used to add/edit user profile
   * ```
   *  URL: /api/user/changeMyProfile
   *  METHOD: PUT
   * ```
   */
  changeMyProfile: async (req, res, next) => {
    try {
      const dto = { ...req.body, ...req.query };
      const { error, value } = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
        phNumber: Joi.string()
          .min(0)
          .max(12)
          .pattern(/^[0-9]+$/)
          .required(),
        countryCode: Joi.string().required(),
        dob: Joi.date().max(new Date()).required(),
        tob: Joi.string()
          .regex(/^([0-9]{2})\:([0-9]{2})$/)
          .required(),
        timeSection: Joi.string().valid("AM", "PM").required(),
        gender: Joi.string().valid("Male", "Female").required(),
        maritialStatus: Joi.string()
          .valid("Married", "Unmarried", "Others")
          .required(),
        language: Joi.string().valid("Hindi", "English").required(),
      }).validate(dto);
      const password = value.password;
      let isPasswordValid =
        /[#$%?!_@`\[\]]/.test(password) *
        /[a-z]+/.test(password) *
        /[A-Z]+/.test(password) *
        /[0-9]+/.test(password);
      if (!isPasswordValid)
        throw new CustomError(
          400,
          "Password must contain upper case,lower case,number and special characters"
        );
      if (error) {
        throw new CustomError(400, error.details[0].message);
      } else {
        const result = await userService.changeMyProfile(value, req.file);
        if (result) {
          res.json({
            success: true,
            message: "User profile updated successfully.",
            data: result,
          });
        } else {
          res.json({
            success: false,
            message: "Error while updating user details.",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },
  /**
   * @name getCountryCodes
   * @description used to all country codes
   * ```
   *  URL: /user/countryCodes
   *  METHOD: GET
   * ```
   */
  getCountryCodes: async (req, res, next) => {
    try {
      const dto = { ...req.body, ...req.query };
      const { error, value } = Joi.object({}).validate(dto);
      if (error) {
        throw new CustomError(400, error.details[0].message);
      } else {
        const result = await userService.getCountryCodes();
        if (result) {
          res.json({
            success: true,
            message: "Country codes fetched successfully.",
            data: result,
          });
        } else {
          res.json({
            success: false,
            message: "Error while fetching country codes.",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
