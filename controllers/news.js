const NewsArticle = require("../models/news");

const getAllNewsArticles = async (req, res) => {
  try {
    const newsArticles = await NewsArticle.find({});
    if (!newsArticles.length) {
      return res.status(404).json({
        success: false,
        message: "No news articles found in the database",
      });
    }
    res.json({
      success: true,
      data: newsArticles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the news articles",
      error: error.message,
    });
  }
};

module.exports = { getAllNewsArticles };
