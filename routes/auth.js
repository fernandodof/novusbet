module.exports = function (app, passport) {
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/failure', function (req, res) {
        return res.json({success: false, message: 'Email já cadastrado', data: undefined});
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        console.log('profile');
        return res.json({success: true, message: 'Apostador recuperado com sucesso', data: req.user});
    });
    
    // SUCESS SIGNUP =========================
    app.get('/sucessSignup', function (req, res) {
        console.log('profile');
        return res.json({success: true, message: 'Apostador cadastrado com sucesso', data: req.user});
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.json({success: true, message: 'Sessão encerrada', data: undefined});
    });

    // ==================================== =========================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form

    app.get('/login', function (req, res) {
        //res.render('login.ejs', {message: req.flash('loginMessage')});
        res.json({success: false, message: 'Fazer login', data: undefined});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function (req, res) {
        //res.render('signup.ejs', {message: req.flash('signupMessage')});
        res.status(500).json({success: false, message: 'Não foi possível realizar o cadastro', data: undefined});
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/sucessSignup', // redirect to the secure profile section
        failureRedirect: '/failure', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email, public_profile']}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/profile',
                failureRedirect: '/failure'
            }
            ));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/profile',
                failureRedirect: '/failure'
            }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function (req, res) {
        res.redirect('/');
    });
    
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', {scope: ['email, public_profile']}));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect: '/profile',
                failureRedirect: '/failure'
            }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', {scope: ['profile', 'email']}));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect: '/profile',
                failureRedirect: '/failure'
            }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function (req, res) {
        var apostador = req.user;
        apostador.local.email = undefined;
        apostador.local.password = undefined;
        apostador.save(function (err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function (req, res) {
        var apostador = req.user;
        apostador.facebook.token = undefined;
        apostador.save(function (err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function (req, res) {
        var apostador = req.user;
        apostador.twitter.token = undefined;
        apostador.save(function (err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function (req, res) {
        var apostador = req.user;
        apostador.google.token = undefined;
        apostador.save(function (err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('logged in');
        return next();
    }
    console.log('logged out');
    res.redirect('/failure');
}