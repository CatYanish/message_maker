var express = require('express');
var router = express.Router();
var path = require('path');

//serve static files
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
