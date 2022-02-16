const router = require("express").Router();
const feedRoute = require("./feedsRoute");
const userRoute = require("./userRoute");

router.use("/feeds", feedRoute);
router.use("/user", userRoute);

module.exports = router;
