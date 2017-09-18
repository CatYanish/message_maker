var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var index = require('./routes/index.js');
var guestMessage = require('./routes/guestMessage.js')

/** ---------- MIDDLEWARE ---------- **/
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json()); // needed for angular requests


/** ---------- EXPRESS ROUTES ---------- **/
app.use('/guest', guestMessage);
app.use('/', index);



/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
