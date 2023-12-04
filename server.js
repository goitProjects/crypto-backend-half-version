const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

const COINGECKO_URL = "https://api.coingecko.com/api/v3";

app.get("/cryptocurrencies", async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
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

    res.json(response.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
