const router = require("express").Router();

const {
  getFullOverview,
  getCoinByName,
  getCoinBySymbol,
  getCoinByPrice,
  getCoinByPriceChange1h,
  getCoinByPriceChange24h,
  getCoinByPriceChange7d,
} = require("../controllers/controllers");

router.get("/", getFullOverview);
router.get("/name", getCoinByName);
router.get("/symbol", getCoinBySymbol);
router.get("/price", getCoinByPrice);
router.get("/priceChange1h", getCoinByPriceChange1h);
router.get("/priceChange24h", getCoinByPriceChange24h);
router.get("/priceChange7d", getCoinByPriceChange7d);

module.exports = router;
