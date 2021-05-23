import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as projectsController from '../controllers/projects'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.post('/api/projects/edit', projectsController.createOrEditProject(dbx))
    fastify.get('/api/projects/tags/get/all', projectsController.getAllTags())
    fastify.post('/api/projects/tags/create', projectsController.createTag())
    fastify.get('/api/projects/technologies/get/all', projectsController.getAllTechnologies())
    fastify.get('/api/projects/check/stringId/:stringId', projectsController.checkProjectStringId())
    fastify.post('/api/projects/technologies/edit', projectsController.editTechnology())
}
