var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var userNotLogged = !req.openid || !req.openid.user;	
  
	if (!userNotLogged) {
	  var userdata = req.openid.user;
	  res.render('CriiptoConnected', { title: 'User logged in', userdata: userdata, userLogged: true  });
	}else{
	  res.render('CriiptoLogin', { title: 'Login', userLogged: !userNotLogged });
	}
});

module.exports = router;
