import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as CRUD from '../controllers/resume'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/resume/get', CRUD.getResume(dbx))
    fastify.put('/api/resume/put', CRUD.addResumeFromData)
}
