const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')
var webpack=require("webpack")

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  run(`vue-cli-service build ${args} --report`)

  const port = 9526
  const publicPath = config.publicPath

  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/']
    })
  )

  app.listen(port, function() {
    console.log(
      chalk.green(`> Preview at  http://localhost:${port}${publicPath}`)
    )
    console.log(
      chalk.green(`> Report at  http://localhost:${port}${publicPath}/report.html`)
    )
  })
} else {
  run(`vue-cli-service build ${args}`)
}
