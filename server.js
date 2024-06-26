const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const checkCache = require("./middleware/checkLastDataCripto");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const routerCoins = require("./routers/coins");
const routerNews = require("./routers/news");

const { PORT, DB_HOST } = process.env;

const swaggerDocument = require("./swagger.json");

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(checkCache);

app.use("/api/coins", routerCoins);
app.use("/api/news", routerNews);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(...message);
  res.status(status).json({ message });
});

mongoose.set("strictQuery", false);
mongoose.connect(DB_HOST);

app.listen(PORT, () => {
  console.log("Server is running");
});
