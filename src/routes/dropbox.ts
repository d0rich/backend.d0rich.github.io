import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox"

import * as dbxController from '../controllers/dropbox'

export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/dbx/files/get/list', {
        schema: {
            description: 'Get list of files',
            tags: ['dropbox'],
            summary: 'Get list of files',
            security: [{"apiKey": []}]
        }
    }, dbxController.getFilesList(dbx))
    fastify.get('/api/dbx/files/get/link', {
        schema: {
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
            security: [{"apiKey": []}]
        }
    }, dbxController.getFile(dbx))

    fastify.post('/api/dbx/files/images/put/svg-placeholder', {
        schema: {
            description: 'Create svg placeholder in dropbox',
            tags: ['dropbox'],
        }
    }, dbxController.generatePlaceholder(dbx))

    fastify.get('/api/dbx/files/images/get/links', dbxController.getImageLinks(dbx))
}
