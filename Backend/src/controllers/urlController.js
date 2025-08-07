const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const shortenUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    const code = nanoid(7);
    const shortUrl = `${process.env.BASE_URL}/${code}`;

    const newUrl = await Url.create({ longUrl, shortUrl, code });
    res.status(201).json(newUrl);
  } catch (err) {
    next(err);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ code });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Increment click counter
    url.clicks += 1;
    url.clickDetails.push({
      ip: req.ip,
      timestamp: new Date()
    });
    await url.save();

    // Return original URL as JSON instead of redirecting
    res.status(200).json({
      success: true,
      originalUrl: url.longUrl,
      clicks: url.clicks
    });
  } catch (err) {
    next(err);
  }
};


const getStats = async (req, res, next) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ code });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({
      longUrl: url.longUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      clickDetails: url.clickDetails
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { shortenUrl, redirectUrl, getStats };
