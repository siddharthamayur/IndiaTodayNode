const router = require("express").Router();
const feedController = require("../controllers/feedsController");

router.get("/getFeeds", feedController.getNewsFeed);
router.get("/getFilters", feedController.getFilters);

module.exports = router;
