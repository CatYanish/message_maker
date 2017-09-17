var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var index = require('./routes/index.js');
var message = require('./routes/message.js')
var guestMessage = require('./routes/guestMessage.js')

/** ---------- MIDDLEWARE ---------- **/
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json()); // needed for angular requests


/** ---------- EXPRESS ROUTES ---------- **/
app.use('/message', message);
app.use('/', index);



// /** -------- MONGOOSE CONNECTION --------**/
// var databaseUrl = 'mongodb://localhost:27017/antares';
// mongoose.connect(databaseUrl);
//
// mongoose.connection.on('connected', function() {
//   console.log('mongoose connected to : ', databaseUrl);
// });
//
// mongoose.connection.on('error', function(err) {
//   console.log('mongoose connection error: ', err);
// });





/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
