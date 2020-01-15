var express = require('express');
var router = express.Router();

router.get('/signout', (req, res) => {
	res.openid.logout()
});

router.post('/login', (req, res) => {
	if (req.body == null || req.body.loginmethod == null) {
		const userLogged = !req.openid || !req.openid.user;
		
		res.render('CriiptoLogin', { title: 'Login', userLogged: userLogged });
	}else{
		res.openid.login({ authorizationParams: {acr_values: req.body.loginmethod }});
	}
});


module.exports = router;