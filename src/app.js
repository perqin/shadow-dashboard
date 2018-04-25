const Koa = require('koa')
const body = require('koa-better-body')
const composeRoutes = require('./utils/compose-routes')

const app = new Koa()

// Body parser
app.use(body({}))

// Routes
app.use(composeRoutes(require('./routers/node')))

module.exports = app
