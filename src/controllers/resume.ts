import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import Resume from '../models/mongo/resume'

import resumeExample from '../data/about/resume'
import {Dropbox} from "dropbox";

export const getResume = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const result = await Resume.findOne()
            //result['photo'] = (await dbx.filesGetTemporaryLink({ path: result['photo'] })).result.link
            return result
        } catch (err) {
            throw boomify(err)
        }
    }
}
export const addResume = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        return new Resume(req.body).save()
    } catch (err){
        throw boomify(err)
    }
}
export const addResumeFromData = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        await Resume.remove()
        return new Resume(resumeExample).save()
    } catch (err){
        throw boomify(err)
    }
}
