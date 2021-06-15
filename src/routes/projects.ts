import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as projectsController from '../controllers/projects'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.get('/api/projects/get/all', projectsController.getProjects())
    fastify.get('/api/projects/get/byStringId/:stringId', projectsController.getProject())
    fastify.get('/api/projects/get/byId/:projectId', projectsController.getProjectById())
    fastify.post('/api/projects/edit', projectsController.createOrEditProject(dbx))
    fastify.get('/api/projects/tags/get/all', projectsController.getAllTags())
    fastify.get('/api/projects/tags/get/forFilters', projectsController.getTagsForFilters())
    fastify.post('/api/projects/tags/create', projectsController.createTag())
    fastify.get('/api/projects/technologies/get/all', projectsController.getAllTechnologies())
    fastify.get('/api/projects/check/stringId/:stringId', projectsController.checkProjectStringId())
    fastify.post('/api/projects/technologies/edit', projectsController.editTechnology())
    fastify.post('/api/projects/delete/:id', projectsController.deleteProject())
}
