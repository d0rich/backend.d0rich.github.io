import  createFastify from 'fastify'
import * as mongoose from 'mongoose'
import * as config from './config'

const fastify = createFastify({
    logger: true
})
mongoose.connect(config.mongoDbUri)
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))

import setRoutes from './routes/index'
setRoutes(fastify)

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address()}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
