import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as resumeController from '../controllers/resume'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/resume/get', resumeController.getResume(dbx))
    fastify.post('/api/resume/edit', resumeController.addResumeFromData(dbx))
}
