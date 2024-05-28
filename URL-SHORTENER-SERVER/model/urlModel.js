const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    match: /^https?:\/\/[^\s$.?#].[^\s]*$/gm 
  },
  shortUrl: {
    type: String,
    required: true
  }
});

const URL = mongoose.model('Url',urlSchema);
module.exports = URL;