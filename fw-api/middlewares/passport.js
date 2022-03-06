const { config } = require('dotenv')
const passport = require('passport')
const googleAuth = require('passport-google-oauth20')

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
        res.redirect('/')
    })

    api.get('/auth/logout', (req, res) => {
        req.session.destroy((err) => {
            req.logout()
            res.redirect('/')
        })
    })
}

