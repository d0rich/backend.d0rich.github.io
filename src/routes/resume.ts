import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as resumeController from '../controllers/resume'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    // Resume
    fastify.get('/api/resume/get/byId/:id', resumeController.getResume())
    fastify.get('/api/resume/get/all', resumeController.getAllResume())
    fastify.get('/api/resume/checkId/:resumeId', resumeController.checkResumeId())
    fastify.post('/api/resume/set', resumeController.setResume(dbx))
    // Socials
    fastify.get('/api/resume/socials/get/byId/:socialId', resumeController.getSocial())
    fastify.get('/api/resume/socials/get/all', resumeController.getAllSocials())
    fastify.get('/api/resume/socials/checkId/:socialId', resumeController.checkSocialId())
    fastify.post('/api/resume/socials/set', resumeController.setSocial())
    // Skills
    fastify.get('/api/resume/skills/get/byId/:skillId', resumeController.getSkillsNote())
    fastify.get('/api/resume/skills/get/all', resumeController.getAllSkillsNotes())
    fastify.get('/api/resume/skills/checkId/:skillId', resumeController.checkSkillId())
    fastify.post('/api/resume/skills/set', resumeController.setSkillsNote())
    // Time Notes
    fastify.get('/api/resume/timeNotes/get/byId/:timeNoteId', resumeController.getTimeNote())
    fastify.get('/api/resume/timeNotes/get/all/education', resumeController.getAllEduTimeNotes())
    fastify.get('/api/resume/timeNotes/get/all/experience', resumeController.getAllExpTimeNotes())
    fastify.get('/api/resume/timeNotes/checkId/:timeNoteId', resumeController.checkTimeNoteId())
    fastify.post('/api/resume/timeNotes/set', resumeController.setTimeNote())
}
