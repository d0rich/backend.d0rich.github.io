import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as resumeController from '../controllers/resume'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/resume/get/byId/:id', resumeController.getResume())
    fastify.get('/api/resume/get/all', resumeController.getAllResume())
    fastify.post('/api/resume/test', resumeController.test(dbx))
}
