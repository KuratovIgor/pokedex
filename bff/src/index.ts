import apiPlugin from './plugins/API'
import axiosPlugin from './plugins/axios'

const app = require('fastify')({
  logger: true
})

app.register(apiPlugin)

app.register(axiosPlugin, {
  timeout: 30000
})

app.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err)
  }
  app.log.info(`server listening on ${address}`)
})
