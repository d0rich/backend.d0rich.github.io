import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import ResumeSchema from '../db/mongo/resume'
import {Resume} from "../classes/resume";
import resumeExample from '../data/about/resume'
import {Dropbox} from "dropbox";

import * as dbxController from '../controllers/dropbox'

export const getResume = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const result = await ResumeSchema.findOne()
            return result
        } catch (err) {
            throw boomify(err)
        }
    }
}
export const addResume = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return new ResumeSchema(req.body).save()
        } catch (err){
            throw boomify(err)
        }
    }
}
export const addResumeFromData  = (dbx: Dropbox) => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            await ResumeSchema.remove()
            const resume = new Resume()
            return new ResumeSchema(resume).save()
        } catch (err){
            throw boomify(err)
        }
    }
}
