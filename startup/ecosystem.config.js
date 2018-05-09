module.exports = {
  apps: [
    {
      name: 'shadow-dashboard',
      script: 'src/bin/server.js',
      env: {
        DEBUG: 'shadow-dashboard:*'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ]
}
