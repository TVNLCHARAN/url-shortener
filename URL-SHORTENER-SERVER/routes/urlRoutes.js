const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const { body } = require('express-validator');

router.post(
    '/shorten',
    body('originalUrl').isURL().withMessage('Invalid URL format'),
    shortenUrl
);

router.get('/:shortUrl', redirectUrl);

module.exports = router;
