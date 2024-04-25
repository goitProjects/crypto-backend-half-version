const router = require("express").Router();

const {
  getAllCoins,
  getCoinByName,
  getCoinBySymbol,
  getCoinByPrice,
  getCoinByPriceChange1h,
  getCoinByPriceChange24h,
  getCoinByPriceChange7d,
} = require("../controllers/coins");

router.get("/all", getAllCoins);
router.get("/name/:name", getCoinByName);
router.get("/symbol/:symbol", getCoinBySymbol);
router.get("/price/:sortOrder", getCoinByPrice);
router.get("/priceChange1h/:sortOrder", getCoinByPriceChange1h);
router.get("/priceChange24h/:sortOrder", getCoinByPriceChange24h);
router.get("/priceChange7d/:sortOrder", getCoinByPriceChange7d);

module.exports = router;
