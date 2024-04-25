const Coins = require("../models/coins");

const { getSortParameter, handleCoinQuery } = require("../helper");

const getAllCoins = async (req, res) => {
  try {
    const coins = await Coins.find({});
    if (!coins.length) {
      return res.status(404).json({
        success: false,
        message: "No coins found in the database",
      });
    }
    res.json(coins);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the coins",
    });
  }
};

const getCoinByName = async (req, res) => {
  const name = req.params.name;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "name not sent",
    });
  }

  const result = await Coins.find({ name: new RegExp(name, "i") });

  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this name",
    });
  }
  res.send(result);
};

const getCoinBySymbol = async (req, res) => {
  const { symbol } = req.params;
  if (!symbol) {
    return res.status(400).json({
      success: false,
      message: "symbol not sent",
    });
  }
  const result = await Coins.find({
    symbol: { $regex: symbol, $options: "i" },
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this symbol",
    });
  }
  res.send(result);
};

const getCoinByPrice = async (req, res) => {
  const sortCriteria = {
    current_price: getSortParameter(req),
  };

  const errorMessage = "Not found coin with this price";

  const response = await handleCoinQuery(sortCriteria, errorMessage, req);

  res.status(response.status).json(response.body);
};

const getCoinByPriceChange1h = async (req, res) => {
  const sortCriteria = {
    price_change_percentage_1h_in_currency: getSortParameter(req),
  };
  const errorMessage = "Not found coin with this price change";

  const response = await handleCoinQuery(sortCriteria, errorMessage, req);

  res.status(response.status).json(response.body);
};

const getCoinByPriceChange24h = async (req, res) => {
  const sortCriteria = {
    price_change_percentage_24h_in_currency: getSortParameter(req),
  };
  const errorMessage = "Not found coin with this price change";

  const response = await handleCoinQuery(sortCriteria, errorMessage, req);

  res.status(response.status).json(response.body);
};

const getCoinByPriceChange7d = async (req, res) => {
  const sortCriteria = {
    price_change_percentage_7d_in_currency: getSortParameter(req),
  };
  const errorMessage = "Not found coin with this price";

  const response = await handleCoinQuery(sortCriteria, errorMessage, req);

  res.status(response.status).json(response.body);
};

module.exports = {
  getAllCoins,
  getCoinByName,
  getCoinBySymbol,
  getCoinByPrice,
  getCoinByPriceChange1h,
  getCoinByPriceChange24h,
  getCoinByPriceChange7d,
};
