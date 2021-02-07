import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox"

import * as CRUD from '../controllers/dropbox'

export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/dbx/getFiles', {
        schema: {
            // @ts-ignore
            description: 'Get list of files',
            tags: ['dropbox'],
            summary: 'get list of files',
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    }, CRUD.getFiles(dbx))
    fastify.get('/api/dbx/getFile', {
        schema: {
            // @ts-ignore
            description: 'Get temporary link to file',
            tags: ['dropbox'],
            summary: 'Get temporary link to file',
            params: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'path to file on cloud'
                    }
                }
            },
            security: [
                {
                    "apiKey": []
                }
            ]
        }
    }, CRUD.getFile(dbx))
}
