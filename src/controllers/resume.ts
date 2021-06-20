import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import { resumeDb } from '../server'
import {Resume} from "../classes/resume";
import {Dropbox} from "dropbox";

import * as dbxController from '../controllers/dropbox'

export const getResume = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const query = await resumeDb.resume.doc(req.params['id']).get()
            if (!query.exists){
                rep.code(404)
                return 'Document not found'
            }
            const resumeData = query.data()
            return {
                ...resumeData,
                photo: (await resumeData.photo?.get())?.data(),
                social: resumeData.social ?
                    await Promise.all(resumeData.social?.map(async s => (await s.get())?.data()))
                    : [],
                skills: resumeData.skills ?
                    await Promise.all(resumeData.skills?.map(async s => (await s.get())?.data()))
                    : [],
                education: resumeData.education ?
                    await Promise.all(resumeData.education?.map(async ed => {
                        const timeNote = (await ed.get())?.data()
                        return {
                            ...timeNote,
                            period: {
                                begin: new Date(timeNote?.period?.begin.seconds * 1000),
                                end: new Date(timeNote?.period?.end.seconds * 1000)
                            }
                        }
                    }))
                    : []
            }
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getAllResume = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const query = await resumeDb.resume.get()
            return query.docs.map(doc => {
                return {
                    id: doc.id,
                    spec: doc.data()?.spec
                }
            })
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const test = (dbx: Dropbox) => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const qs = await resumeDb.resume
                .get()
            const res = qs.docs.map(async doc => {
                const docData = doc.data()
                const photo = (await docData?.photo.get() ).data()
                return {
                    ...docData,
                    photo
                }
            })
            return await Promise.all(res)
        } catch (err){
            throw boomify(err)
        }
    }
}
