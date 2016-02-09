module.exports = function (app, passport) {
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.sendfile('public/index.html');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        return res.json({success: true, message: 'Apostador recuperado com sucesso', data: req.user});
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.json({success: true, message: 'Sessão encerrada', data: null});
    });

    // ==================================== =========================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form

    app.get('/login', function (req, res) {
        //res.render('login.ejs', {message: req.flash('loginMessage')});
        res.redirect('/');
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
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email, public_profile']}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/profile',
                failureRedirect: '/'
            }
            ));


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}