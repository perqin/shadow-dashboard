const Koa = require('koa')
const body = require('koa-better-body')
const cors = require('@koa/cors')
const composeRoutes = require('./utils/compose-routes')

const app = new Koa()

// CORS
if (app.env === 'development') {
  app.use(cors())
}

// Body parser
app.use(body({}))

// Routes
app.use(composeRoutes(require('./routers/node')))
app.use(composeRoutes(require('./routers/subscription')))

module.exports = app
