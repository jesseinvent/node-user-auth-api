
import http from 'http'
import app from './app.js'
import getServerPort from './utils/getServerPort.js'

const server = http.createServer(app)

const port = getServerPort()

server.listen(port, () => console.log(`Server running on port http://127.0.0.1:${port} 😁`))