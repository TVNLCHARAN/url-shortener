const URL = require('../model/urlModel');
const { validationResult } = require('express-validator');

const shortenUrl = async (req, res) => {
    const { nanoid } = await import('nanoid');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { originalUrl } = req.body;
    const shortUrl = nanoid(7);

    try {
        const url = new URL({ originalUrl, shortUrl });
        await url.save();
        res.status(200).json({ originalUrl, shortUrl });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await URL.findOne({ shortUrl });

        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    shortenUrl,
    redirectUrl
};
