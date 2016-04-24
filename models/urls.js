var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlsSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
      type: String,
      required: true,
      unique: true
  }
});

var Url = mongoose.model('Url', UrlsSchema);

module.exports = Url;
