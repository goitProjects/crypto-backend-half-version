const mongoose = require("mongoose");

const cryptoImageSchema = new mongoose.Schema(
  {
    thumb: String,
    small: String,
    large: String,
  },
  { _id: false }
);

const coinsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  block_time_in_minutes: { type: String, required: false },
  image: cryptoImageSchema,
  latest_price: { type: Number, required: false },
  latest_arithmetic: { type: Number, required: false },
  latest_geometric: { type: Number, required: false },
  latest_harmonic: { type: Number, required: false },
  price_change_24h_in_percentage: { type: Number, required: false },
  total_supply: { type: Number, required: false },
  market_cap: { type: Number, required: false },
  total_volume: { type: Number, required: false },
  market_cap_change_24h: { type: Number, required: false },
  market_cap_change_percentage_24h: { type: Number, required: false },
  circulating_supply: { type: String, required: false },
});

const Coins = mongoose.model("Coins", coinsSchema);

module.exports = Coins;
