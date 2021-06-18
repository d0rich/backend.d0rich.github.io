import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify"
import {Dropbox} from "dropbox"

import applyResumeRoutes from './resume'
import applyDropboxRoutes from './dropbox'
import applyAuthRoutes from './auth'
import applyProjectsRoutes from './projects'
import applySEOController from './seo'

export default function (fastify: FastifyInstance, dbx: Dropbox){
    fastify.addHook('onRequest', (request: FastifyRequest, reply :FastifyReply, done) => {
        // reply.header('Access-Control-Allow-Origin','https://d0rich.github.io/#/')
        reply.header('Access-Control-Allow-Origin','*')
        reply.header('Access-Control-Allow-Headers','*')
        done()
    })

    fastify.options('/api/*', async (req: FastifyRequest, rep: FastifyReply) => {
        rep.code(200)
        return 'OK'
    })

    fastify.get('/', {
        schema: {
            description: 'display some test action',
            tags: ['test'],
            summary: 'test route',
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'user id'
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    hello: { type: 'string' },
                    obj: {
                        type: 'object',
                        properties: {
                            some: { type: 'string' }
                        }
                    }
                }
            },
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    }, async (request, reply) => {
        return { hello: 'world' }
    })

    applyResumeRoutes(fastify, dbx)
    applyDropboxRoutes(fastify, dbx)
    applyAuthRoutes(fastify)
    applyProjectsRoutes(fastify, dbx)
    applySEOController(fastify)
}
