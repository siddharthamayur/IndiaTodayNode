const router = require("express").Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const IMG_SIZE_LIMIT = 5 * 1024 * 1024;

router.get("/myProfile", userController.viewMyProfile);
router.put(
  "/modifyProfile",
  multer({
    limits: { fileSize: IMG_SIZE_LIMIT },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(new CustomError(400, "Invalid image type"));
      }
    },
  }).single("image"),
  userController.changeMyProfile
);
router.get("/countryCode", userController.getCountryCodes);

module.exports = router;
