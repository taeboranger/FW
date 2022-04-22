const express = require('express')
const api = express()
const cookieParser = require('cookie-parser')

const uuid = require('node-uuid')
const createNamespace = require('continuation-local-storage').createNamespace
const apiReq = createNamespace('api')

const sequelize = require('./models/index').sequelize
const User = require('./models/index').User

const log = require('./components/logger.js').log
const err = require('./components/logger.js').err

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

api.use(express.static(__dirname + '/views'))
api.set('view engine', 'ejs')
api.engine('html', require('ejs').renderFile);

api.use(cookieParser())
const configSession = require('./middlewares/session')
configSession(api)

api.use((req, res, next) => {
    apiReq.run(() => {
        apiReq.set('reqId', uuid.v1())
        next()
    })
})

const configPassport = require('./middlewares/passport')
configPassport(api)

const configGraphQL = require('./graphql/graphqlHTTP')
configGraphQL(api)

api.listen(PORT, () => {
    const driver = async () => {
        try {
            await sequelize.sync()
        } catch (e) {
            err(`sequelize error : ${e}`)
            return
        }

        log('sequelizer working')
    }
    driver()

    log(`Server running on Port ${PORT}`)
})

api.get('/', (req, res) => {
    if (!req.user) {
        res.render('./html/index.ejs', {
            btn: `<div class='nav-btn-google-login' onclick=" window.location.href = '/auth/google' ">
                    <img src="./img/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png"></img>
                    </div>`
        })
    }
    else {
        res.render('./html/index.ejs', { btn: null })
    }
})

api.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})