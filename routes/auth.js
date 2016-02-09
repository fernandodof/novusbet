//var express = require('express');
//var router = express.Router();
//
//router.route('/profile')
//    .get(function(req,res,next){
//        res.json(success: true, message: 'Apostador recuperado com sucesso', data: req.apostador);
//    });
//
//router.route('/logout')
//    .get(function(req,res,next){
//        req.logout();
//        res.json(success: true, message: 'Sessão encerrada', data: null);
//    });

module.exports = function(app, passport) {
    
	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		return res.json({success: true, message: 'Apostador recuperado com sucesso', data: req.apostador});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
        req.logout();
        res.json({success: true, message: 'Sessão encerrada', data: null});
	});

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

	// facebook -------------------------------

	// send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
	       successRedirect : '/profile',
	       failureRedirect : '/'
		}
    ));
    
    
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}