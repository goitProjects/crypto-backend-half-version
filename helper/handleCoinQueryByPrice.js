const Coins = require("../models/crypto");

async function handleCoinQueryByPrice(sortCriteria, errorMessage) {
  console.log(sortCriteria);
  try {
    const result = await Coins.find({}).sort(sortCriteria);

    if (!result) {
      return {
        status: 404,
        body: {
          success: false,
          message: errorMessage || "Not found coin with the specified criteria",
        },
      };
    }
    return {
      status: 200,
      body: result,
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        message:
          error.message || "An error occurred while retrieving the coins.",
      },
    };
  }
}
module.exports = { handleCoinQuery: handleCoinQueryByPrice };
