import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify"
import {Dropbox} from "dropbox"

import applyResumeRoutes from './resume'
import applyDropboxRoutes from './dropbox'

export default function (fastify: FastifyInstance, dbx: Dropbox){
    fastify.addHook('onRequest', (request: FastifyRequest, reply :FastifyReply, done) => {
        reply.header('Access-Control-Allow-Origin','*')
        done()
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
}
