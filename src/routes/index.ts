import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify"
import {Dropbox} from "dropbox"

import applyResumeRoutes from './resume'
import applyDropboxRoutes from './dropbox'
import applyAuthRoutes from './auth'
import applyProjectsRoutes from './projects'
import applyNewsRoutes from './news'
import applySEOController from './seo'

export default function (fastify: FastifyInstance, dbx: Dropbox){
    fastify.options('/api/*', async (req: FastifyRequest, rep: FastifyReply) => {
        rep.code(200)
        return 'OK'
    })

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    applyResumeRoutes(fastify, dbx)
    applyDropboxRoutes(fastify, dbx)
    applyAuthRoutes(fastify)
    applyProjectsRoutes(fastify, dbx)
    applyNewsRoutes(fastify, dbx)
    applySEOController(fastify)
}
