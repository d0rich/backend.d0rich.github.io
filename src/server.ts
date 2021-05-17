import  createFastify from 'fastify'
import * as mongoose from 'mongoose'
import {Sequelize} from "sequelize"
import {initModels} from "./models/postgre";
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
const sequelize = new Sequelize(
    config.postgre.credentials.database,
    config.postgre.credentials.user,
    config.postgre.credentials.password,
    {
        logging: false,
        host: config.postgre.credentials.host,
        dialect: "postgres",
        protocol: config.postgre.options.protocol,
        dialectOptions: config.postgre.options.dialectOptions,
        define: {
            timestamps: config.postgre.options.timestamps
        }
    })
export const models = initModels(sequelize)
sequelize.sync({ force: false, alter: false })
    .then(result => {
        console.log('PostgreSQL connected…')
    })
    .catch(err => console.error(err));

import applyRoutes from './routes'
applyRoutes(fastify, dbx)

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
