import createFastify, {FastifyReply, FastifyRequest} from 'fastify'
import mongoose from "mongoose";
import {Sequelize} from "sequelize"
import fastifySwagger from "fastify-swagger"
import { Dropbox } from 'dropbox'
import { initDbs } from "./db";
import * as config from './config'

// Инициализация fastify
const fastify = createFastify({
    logger: {
        prettyPrint: true
    },
    bodyLimit: 20971520
})
// Регистрация middleware
fastify.register(require('fastify-rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
})

// Подключение к dropbox
const dbx = new Dropbox({ accessToken: config.dropbox.token })

// Подключение к базам данных
const { authDb, projectsDb } = initDbs()
export { authDb, projectsDb }

// Политика CORS
fastify.addHook('onRequest', (request: FastifyRequest, reply :FastifyReply, done) => {
    // reply.header('Access-Control-Allow-Origin','https://d0rich.github.io/#/')
    reply.header('Access-Control-Allow-Origin','*')
    reply.header('Access-Control-Allow-Headers','*')
    done()
})

// Инициализация рутов
import applyRoutes from './routes'
applyRoutes(fastify, dbx)

// Прослушивание адреса
const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
        //fastify.swagger()
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
