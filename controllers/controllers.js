const Coins = require("../models/crypto");

const { getSortParameter, handleCoinQuery } = require("../helper");


//написати запит на пошук по назві монети
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

//написати запит на пошук по символу маонети
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

//написати запит сотрування по ціні від більшого до меньшого

const getCoinByPrice = async (req, res) => {
  const sortCriteria = {
    current_price: getSortParameter(req),
  };

  const errorMessage = "Not found coin with this price";
  const response = await handleCoinQuery(sortCriteria, errorMessage);
  res.status(response.status).json(response.body);
};

const getCoinByPriceChange1h = async (req, res) => {
  const sortCriteria = {
    price_change_percentage_1h_in_currency: getSortParameter(req),
  };
  const errorMessage = "Not found coin with this price change";
  const response = await handleCoinQuery(sortCriteria, errorMessage);
  res.status(response.status).json(response.body);
};

const getCoinByPriceChange24h = async (req, res) => {
  const sortCriteria = {
    price_change_percentage_24h_in_currency: getSortParameter(req),
  };
  const errorMessage = "Not found coin with this price change";
  const response = await handleCoinQuery(sortCriteria, errorMessage);
  res.status(response.status).json(response.body);
};

const getCoinByPriceChange7d = async (req, res) => {
  const sortCriteria = {
    price_change_percentage_7d_in_currency: getSortParameter(req),
  };
  const errorMessage = "Not found coin with this price";
  const response = await handleCoinQuery(sortCriteria, errorMessage);
  res.status(response.status).json(response.body);
};

module.exports = {
  getCoinByName,
  getCoinBySymbol,
  getCoinByPrice,
  getCoinByPriceChange1h,
  getCoinByPriceChange24h,
  getCoinByPriceChange7d,getCoinList,
};
// categoryList,getTopBooks,getById, getByCategory,
