var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var userdata = req.openid.user;
  
  res.render('CriiptoConnected', { title: 'User Logged In', userdata: userdata, userLogged: true  });
});


module.exports = router;