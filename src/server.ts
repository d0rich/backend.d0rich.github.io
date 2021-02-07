import  createFastify from 'fastify'
import * as mongoose from 'mongoose'
import fastifySwagger from "fastify-swagger"
import { Dropbox } from 'dropbox'
import * as config from './config'

const dbx = new Dropbox({ accessToken: config.dropbox.token })
const fastify = createFastify({
    logger: {
        prettyPrint: true
    }
})
fastify.register(fastifySwagger, config.swagger.options)
mongoose.connect(config.mongoDbUri, {useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))


import applyRoutes from './routes'
applyRoutes(fastify, dbx)

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000)
        fastify.swagger()
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
