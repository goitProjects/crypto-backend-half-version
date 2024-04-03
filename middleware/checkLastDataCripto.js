const Coins = require("../models/crypto");
const axios = require("axios");
const url = "https://api.coingecko.com/api/v3/coins/markets";
const axiosRetry = require('axios-retry');

// Создание экземпляра axios с настройками повторных попыток
const axiosInstance = axios.create();
axiosRetry(axiosInstance, {
  retries: 3, // Количество повторных попыток
  retryDelay: axiosRetry.exponentialDelay, // Экспоненциальная задержка между попытками
  retryCondition: (error) => {
    // Только для ошибки с кодом 429
    return error.response && error.response.status === 429;
  },
});

let cachedData = new Date();

const getFullOverview = async () => {
  const data = await axios.get(`${url}`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      locale: "en",
      price_change_percentage: "1h,24h,7d",
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
  //Delete coins that are not in the new collection
  await Coins.deleteMany({
    id: {
      $nin: data.data.map((coin) => coin.id),
    },
  });
  return Object.keys(data).length;
};

// Middleware для проверки кэшированной переменной
const checkCache = (req, res, next) => {
  console.log("проверка кеша");
  if (cachedData.toISOString() > new Date().toISOString()) {
    console.log("cachedData.toISOString(): ", cachedData.toISOString());
    console.log("new Date().toISOString(): ", new Date().toISOString());
    console.log("кеш удовлетворяет условию");
    // Если кэш соответствует условию, продолжаем обработку запроса
    next();
  } else {
    // Если кэш не соответствует условию, сначала выполняем специальную функцию
    console.log("дата просрочена либо первый вызов при старте сервера");
    cachedData = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    // eslint-disable-next-line id-length
    getFullOverview().then((r) => {
      if (r) {
        next();
      }
    });
  }
};

module.exports = checkCache;
