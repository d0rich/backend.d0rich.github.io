import  createFastify from 'fastify'
import mongoose from "mongoose";
import {Sequelize} from "sequelize"
import {initModels} from "./models/auth";
import fastifySwagger from "fastify-swagger"
import { Dropbox } from 'dropbox'
import * as config from './config'

// Инициализация fastify
const fastify = createFastify({
    logger: {
        prettyPrint: true
    }
})
// Регистрация middleware
fastify.register(fastifySwagger, config.swagger.options)
fastify.register(require('fastify-rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
})
// Подключение к dropbox
const dbx = new Dropbox({ accessToken: config.dropbox.token })
// Подключение к mongodb
mongoose.connect(config.mongoDbUri, {useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))
// Подключение к Postgres Auth
const sequelize = new Sequelize(
    config.postgresAuth.db,
    config.postgresAuth.user,
    config.postgresAuth.password,
    config.postgresAuth.options)
export const db = initModels(sequelize)
sequelize.sync({ force: false, alter: false })
    .then(result => {
        console.log('PostgreSQL connected…')
    })
    .catch(err => console.error(err));

// Инициализация рутов
import applyRoutes from './routes'
applyRoutes(fastify, dbx)

// Прослушивание адреса
const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
        fastify.swagger()
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
