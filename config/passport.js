//var express = require('express');
//var router = express.Router();
//var passport = require('passport');
//var FacebookStrategy = require('passport-facebook').Strategy;
//var request = require('request');

//var config = require('../config.js');
//var Apostador = require('../models/apostador');
//
//var auth = require('../auth/authValidations');
//
//router.route('/facebook')
//    .get(function(req,res,next){
//        facebookAuth();  
//
//        console.log('/facebook');
//        res.send('facebook');
//    });

//router.route('/facebook')
//    .get(function(req, res) {
//        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
//        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
//        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
//
//        var params = {
//            code: req.query.code,
//            client_id: config.facebook.clientId,
//            client_secret: config.facebook.clientSecret,
//            redirect_uri: config.facebook.callbackURL
//        };
//
//        console.log(params);
//        // Step 1. Exchange authorization code for access token.
//        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
//            if (response.statusCode !== 200) {
//            return res.status(500).send({ message: accessToken.error.message });
//        }
//            
//        // Step 2. Retrieve profile information about the current apostador.
//        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
//            if (response.statusCode !== 200) {
//                return res.status(500).send({ message: profile.error.message });
//            }
//            if (req.headers.authorization) {
//                Apostador.findOne({ facebook: profile.id }, function(err, existingApostador) {
//                    if (existingApostador) {
//                        return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
//                    }
//                    var token = req.headers.authorization.split(' ')[1];
//                    var payload = jwt.decode(token, config.TOKEN_SECRET);
//                    Apostador.findById(payload.sub, function(err, apostador) {
//                        if (!apostador) {
//                            return res.status(400).send({ message: 'Apostador não encontrado' });
//                        }
//                        apostador.facebook = profile.id;
//                        apostador.picture = apostador.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
//                        apostador.displayName = apostador.displayName || profile.name;
//                        apostador.save(function() {
//                            var token = createJWT(user);
//                            res.send({ token: token });
//                        });
//                    });
//                });
//            } else {
//                // Step 3b. Create a new user account or return an existing one.
//                Apostador.findOne({ facebook: profile.id }, function(err, existingApostador) {
//                    if (existingApostador) {
//                        var token = createJWT(existingApostador);
//                        return res.send({ token: token });
//                    }
//                    var apostador = new Apostador();
//                    apostador.facebook = profile.id;
//                    apostador.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
//                    apostador.displayName = profile.name;
//                    apostador.save(function() {
//                        var token = createJWT(user);
//                        res.send({ token: token });
//                    });
//                });
//            }
//        });
//    });
//});

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var config = require('../config/config.js');
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
        // by default, local strategy uses apostadorname and password, we will override with email
        apostadornameField : 'email',
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
        // by default, local strategy uses apostadorname and password, we will override with email
        apostadornameField : 'email',
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
                if (err)
                    return done(err);

                // check to see if there's already a apostador with that email
                if (existingApostador) 
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                //  If we're logged in, we're connecting a new local account.
                if(req.apostador) {
                    var apostador       = req.apostador;
                    apostador.local.email    = email;
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
                    var newApostador       = new Apostador();

                    newApostador.local.email    = email;
                    newApostador.local.password = newApostador.generateHash(password);

                    newApostador.save(function(err) {
                        if (err)
                            throw err;

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
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a apostador is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the apostador is already logged in
            if (!req.apostador) {

                Apostador.findOne({ 'facebook.id' : profile.id }, function(err, apostador) {
                    if (err)
                        return done(err);

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
                            if (err)
                                throw err;
                            return done(null, newApostador);
                        });
                    }
                });

            } else {
                // apostador already exists and is logged in, we have to link accounts
                var apostador            = req.apostador; // pull the apostador out of the session

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
            if (!req.apostador) {

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
                        var newApostador          = new Apostador();

                        newApostador.google.id    = profile.id;
                        newApostador.google.token = token;
                        newApostador.google.name  = profile.displayName;
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
                var apostador               = req.apostador; // pull the apostador out of the session

                apostador.google.id    = profile.id;
                apostador.google.token = token;
                apostador.google.name  = profile.displayName;
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