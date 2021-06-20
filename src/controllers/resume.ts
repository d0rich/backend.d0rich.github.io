import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import { resumeDb } from '../server'
import {Resume} from "../classes/resume";
import {Dropbox} from "dropbox";

import * as dbxController from '../controllers/dropbox'
import {firestore} from "firebase-admin/lib/firestore";

export const getResume = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const documentSnapshot = await resumeDb.resume.doc(req.params['id']).get()
            if (!documentSnapshot.exists){
                rep.code(404)
                return 'Document not found'
            }
            const resumeData = documentSnapshot.data()
            return {
                ...resumeData,
                photo: await methods.getNestedDocument(resumeData.photo),
                social: await methods.getNestedArray(resumeData.social),
                skills: await methods.getNestedArray(resumeData.skills),
                education: await methods.getNestedArray(resumeData.education),
                experience: await methods.getNestedArray(resumeData.experience)
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

const methods = {
    async getNestedDocument(ref: firestore.DocumentReference | undefined){
        try {
            const documentSnapshot = await ref.get()
            return  {
                id: documentSnapshot.id,
                ...documentSnapshot.data()
            }
        }
        catch (e){
            return ref
        }
    },
    async getNestedArray(refs: firestore.DocumentReference[] | undefined){
        return refs ?
            await Promise.all(refs?.map(async ref => {
                try {
                    const documentSnapshot = await ref.get()
                    return  {
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    }
                }
                catch (e){
                    return ref
                }
            })) : []
    }
}
