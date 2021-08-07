import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox"

import * as dbxController from '../controllers/dropbox'

export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/dbx/files/get/list', dbxController.getFilesList(dbx))
    fastify.get('/api/dbx/files/get/link', dbxController.getFile(dbx))
    fastify.post('/api/dbx/files/images/put/svg-placeholder', dbxController.generatePlaceholder(dbx))
}
