const router = require("express").Router();

const { getAllNewsArticles } = require("../controllers/news");

router.get("/all", getAllNewsArticles);

module.exports = router;
