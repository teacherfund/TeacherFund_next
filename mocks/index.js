if (typeof window === 'undefined') {
  const { server } = require('../mocks/server')
  server.listen()
} else {
  const { worker } = require('../mocks/browser')
  worker.start()
}
