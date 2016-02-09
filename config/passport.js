// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var config = require('../config/config');
var Apostador = require('../models/apostador');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the apostador for the session
    passport.serializeUser(function(apostador, done) {
        done(null, apostador.id);
    });

    // used to deserialize the apostador
    passport.deserializeUser(function(id, done) {
        Apostador.findById(id, function(err, apostador) {
            done(err, apostador);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses usrename and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a apostador is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            Apostador.findOne({ 'local.email' :  email }, function(err, apostador) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no apostador is found, return the message
                if (!apostador)
                    return done(null, false, req.flash('loginMessage', 'No apostador found.'));

                if (!apostador.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return apostador
                else
                    return done(null, apostador);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a apostador is logged in or not)
    },
    function(req, email, password, done) {
        // asynchronous
        process.nextTick(function() {
            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            Apostador.findOne({'local.email': email}, function(err, existingApostador) {
                // if there are any errors, return the error
                if (err){
                    return done(err);
                }
                // check to see if there's already a apostador with that email
                if (existingApostador) {
                    console.log(existingApostador);
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }
                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var apostador = req.user;
                    apostador.local.email = email;
                    apostador.local.password = apostador.generateHash(password);
                    apostador.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, apostador);
                    });
                } 
                //  We're not logged in, so we're creating a brand new apostador.
                else {
                    // create the apostador
                    var newApostador = new Apostador();

                    newApostador.local.email = email;
                    newApostador.local.password = newApostador.generateHash(password);

                    newApostador.save(function(err) {
                        if (err){
                            console.log(err);
                            throw err;
                        }
                        return done(null, newApostador);
                    });
                }

            });
        });

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : config.facebook.clientId,
        clientSecret    : config.facebook.clientSecret,
        callbackURL     : config.facebook.callbackURL,
        profileFields: ['id', 'email', 'displayName', 'gender', 'link', 'locale', 'name'],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a apostador is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the apostador is already logged in
            if (!req.user) {
                Apostador.findOne({ 'facebook.id' : profile.id }, function(err, apostador) {
                    
                    if (err){
                        return done(err);
                    }
                    
                    if (apostador) {

                        // if there is a apostador id already but no token (apostador was linked at one point and then removed)
                        if (!apostador.facebook.token) {
                            apostador.facebook.token = token;
                            apostador.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            apostador.facebook.email = profile.emails[0].value;

                            apostador.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, apostador);
                            });
                        }

                        return done(null, apostador); // apostador found, return that apostador
                    } else {
                        // if there is no apostador, create them
                        var newApostador            = new Apostador();
                        
                        newApostador.facebook.id    = profile.id;
                        newApostador.facebook.token = token;
                        newApostador.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newApostador.facebook.email = profile.emails[0].value;

                        newApostador.save(function(err) {
                            if (err){
                                console.log(err);
                                throw err;
                            }
                            return done(null, newApostador);
                        });
                    }
                });

            } else {
                // apostador already exists and is logged in, we have to link accounts
                var apostador            = req.user; // pull the apostador out of the session

                apostador.facebook.id    = profile.id;
                apostador.facebook.token = token;
                apostador.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                apostador.facebook.email = profile.emails[0].value;

                apostador.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, apostador);
                });

            }
        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : config.google.clientId,
        clientSecret    : config.google.clientSecret,
        callbackURL     : config.google.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a apostador is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the apostador is already logged in
            if (!req.user) {

                Apostador.findOne({ 'google.id' : profile.id }, function(err, apostador) {
                    if (err)
                        return done(err);

                    if (apostador) {

                        // if there is a apostador id already but no token (apostador was linked at one point and then removed)
                        if (!apostador.google.token) {
                            apostador.google.token = token;
                            apostador.google.name  = profile.displayName;
                            apostador.google.email = profile.emails[0].value; // pull the first email

                            apostador.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, apostador);
                            });
                        }

                        return done(null, apostador);
                    } else {
                        var newApostador = new Apostador();

                        newApostador.google.id  = profile.id;
                        newApostador.google.token = token;
                        newApostador.google.name = profile.displayName;
                        newApostador.google.email = profile.emails[0].value; // pull the first email

                        newApostador.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newApostador);
                        });
                    }
                });

            } else {
                // apostador already exists and is logged in, we have to link accounts
                var apostador = req.user; // pull the apostador out of the session

                apostador.google.id = profile.id;
                apostador.google.token = token;
                apostador.google.name = profile.displayName;
                apostador.google.email = profile.emails[0].value; // pull the first email

                apostador.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, apostador);
                });

            }

        });

    }));

};