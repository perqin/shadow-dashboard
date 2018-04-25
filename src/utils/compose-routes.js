const compose = require('koa-compose')

module.exports = router => compose([
  router.routes(),
  router.allowedMethods()
])
