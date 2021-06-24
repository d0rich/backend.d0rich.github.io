import createFastify, {FastifyReply, FastifyRequest} from 'fastify'
import { Dropbox } from 'dropbox'
import * as firebase from "firebase-admin"
import { initDbs } from "./db"
import * as config from './config'
require('dotenv').config();

// Инициализация fastify
const fastify = createFastify({
    logger: {
        prettyPrint: true
    },
    bodyLimit: 20971520
})
// Регистрация middleware
fastify.register(require('fastify-rate-limit'), {
    max: 200,
    timeWindow: '1 minute'
})

// Подключение к dropbox
const dbx = new Dropbox({ accessToken: config.dropbox.token })

// Подключение к firebase

const firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert(require('./account_key.json'))
})

// Подключение к базам данных
const { authDb, projectsDb, resumeDb } = initDbs(firebaseApp)
export { authDb, projectsDb, resumeDb }

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
        await fastify.listen(process.env.PORT || 3000, process.env.LISTEN_ADDRESS)
        //fastify.swagger()
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
