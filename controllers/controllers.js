const axios = require("axios");
const Book = require("../models/сщштыs");
const axios = require("axios");

const url = "https://api.coingecko.com/api/v3/coins";

const today = new Date().toString().slice(0, 15);

const getFullOverview = async () => {
  const data = await axios.get(`${url}/coins`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      limit: 10, // You can adjust the limit as per your needs
      sparkline: false,
      market_dominance: false,
      market_cap_change_percentage_24h: false,
      market_cap: true,
      market_volume: true,
      exchange_volume: true,
      vs_currency_change_24h: true,
      price: true,
      symbol: true,
      last_updated: true,
      market_cap_rank: true,
      percent_change_1h: true,
      percent_change_24h: true,
      percent_change_7d: true,
      market_cap_change_24h: true,
      market_cap_change_percentage_24h_in_currency: true,
      market_volume_change_24h: true,
      market_volume_change_percentage_24h: true,
      circulating_supply: true,
      total_supply: true,
      ath: true,
      ath_change_percentage: true,
      ath_date: true,
      roi: true,
      last_updated: true,
      market_cap_rank: true,
      price_change_percentage_1h_in_currency: true,
      price_change_percentage_24h_in_currency: true,
      price_change_percentage_7d_in_currency: true,
    },
  });
  const existingCoins = await Coins.find({});
  data.data.map(async (coin) => {
    const existingCoin = existingCoins.find((item) => item.id === coin.id);
    if (existingCoin) {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      await Coins.updateOne({ id: coin.id }, { date: Date.now() });
    }
    if (!existingCoin) {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      await Coins.create({ ...coin });
    }
  });
  // Delete coins that are not in the new collection
  await Coins.deleteMany({
    id: {
      $nin: data.data.map((coin) => coin.id),
    },
  });
};

//написати запит на пошук по назві маонети
const getCoinByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "name not sent",
    });
  }
  const result = await Coins.find({ name: { $regex: name, $options: "i" } });
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
  const result = await Coins.find().sort({ latest_price: -1 });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по ціні від меньшого до більшого
const getCoinByPrice = async (req, res) => {
  const result = await Coins.find().sort({ latest_price: 1 });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по зміні ціні за 1 час від більшого до меньшого
const getCoinByPriceChange1h = async (req, res) => {
  const result = await Coins.find().sort({
    price_change_percentage_1h_in_currency: -1,
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по зміні ціні за 1 час від меньшого до більшого
const getCoinByPriceChange1h = async (req, res) => {
  const result = await Coins.find().sort({
    price_change_percentage_1h_in_currency: 1,
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по зміні ціні за 24 години від більшого до меньшого
const getCoinByPriceChange24h = async (req, res) => {
  const result = await Coins.find().sort({
    price_change_percentage_24h_in_currency: -1,
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по зміні ціні за 24 години від меньшого до більшого
const getCoinByPriceChange24h = async (req, res) => {
  const result = await Coins.find().sort({
    price_change_percentage_24h_in_currency: 1,
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по зміні ціні за 7 днів від більшого до меньшого
const getCoinByPriceChange7d = async (req, res) => {
  const result = await Coins.find().sort({
    price_change_percentage_7d_in_currency: -1,
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

//написати запит сотрування по зміні ціні за 7 днів від меньшого до більшого
const getCoinByPriceChange7d = async (req, res) => {
  const result = await Coins.find().sort({
    price_change_percentage_7d_in_currency: 1,
  });
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Not found coin with this price",
    });
  }
  res.send(result);
};

module.exports = {
  getFullOverview,
  getCoinByName,
  getCoinBySymbol,
  getCoinByPrice,
  getCoinByPriceChange1h,
  getCoinByPriceChange24h,
  getCoinByPriceChange7d,
};
