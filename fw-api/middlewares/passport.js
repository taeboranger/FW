const { config } = require('dotenv')
const passport = require('passport')
const googleAuth = require('passport-google-oauth20')

const log = require('../components/logger.js').log
const err = require('../components/logger.js').err

const sequelize = require('sequelize')
const User = require('../models/index').User

module.exports = api => {
    api.use(passport.initialize())
    api.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    passport.use(
        new googleAuth(
            {
                clientID: process.env['GOOGLE_CLIENT_ID'],
                clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: process.env['GOOGLE_CALLBACK']
            }, (accessToken, refreshToken, profile, done) => {
                done(null, profile)
            }
        )
    )

    api.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }))
    api.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/auth/google/fail'
    }), (req, res) => {
        email = req.user.emails[0].value
        console.log(req.user.emails[0].value)
        User.findOne({
            attributes: ['userId'],
            where: {
                email: email
            }
        }).then(res => {
            if (!res) {
                User.create({
                    userId: "demo",
                    email: email,
                    total_c: 0,
                    total_p: 0
                }).then(() => {
                    log("User created : " + email)
                }).catch((error) => {
                    err("User creation error occured : " + error)
                })
            }
            else {
                log("User login : " + email)
            }
        }).catch(error => {
            err("User select error occured : " + error)
        })
        res.redirect('/')
    })

    api.get('/auth/logout', (req, res) => {
        req.session.destroy((err) => {
            req.logout()
            res.redirect('/')
        })
    })

    api.get('/auth/google/fail', (req, res) => {

    })
}

