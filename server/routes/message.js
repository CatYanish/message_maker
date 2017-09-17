var express = require('express');
var router = express.Router();
// var Message = require('../models/message.schema.js');


//
// router.get('/', function(req, res) {
//   Message.find({}, function(err, data) {
//     if(err) {
//       console.log('find error: ', err);
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// }); //end of get function


//
// router.post('/', function(req, res) {
//   console.log('log the data: ', req.body);
//   var addMessage = new Message(req.body);
//   addMessage.save(function(err, data) {
//     console.log('saved data:', data);
//     if(err) {
//       console.log('save error: ', err);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });//end of post function



module.exports = router;
