const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
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

// Static routes
app.use(serve(path.resolve(__dirname, 'public')))

// Routes
app.use(composeRoutes(require('./routers/node')))
app.use(composeRoutes(require('./routers/subscription')))
app.use(composeRoutes(require('./routers/setting')))

module.exports = app
