import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import { getNestedDocument, getNestedArray } from "../db/firebase/methods";
import { resumeDb } from '../server'
import {Dropbox} from "dropbox";

import * as dbxController from '../controllers/dropbox'
import {firestore} from "firebase-admin/lib/firestore";
import * as auth from "./auth";

export const getResume = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const documentSnapshot = await resumeDb.resume.doc(req.params['id']).get()
            if (!documentSnapshot.exists){
                rep.code(404)
                return 'Document not found'
            }
            const resumeData = documentSnapshot.data()
            if (!resumeData.show)
                if (! await auth.methods.checkToken(req, rep))
                    return
            return {
                id: documentSnapshot.id,
                ...resumeData,
                photo: await getNestedDocument(resumeData.photo),
                social: await getNestedArray(resumeData.social),
                skills: await getNestedArray(resumeData.skills),
                education: await getNestedArray(resumeData.education),
                experience: await getNestedArray(resumeData.experience)
            }
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getAllResume = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            let ref: firestore.CollectionReference | firestore.Query = resumeDb.resume
            const validToken = await auth.methods.checkToken(req, rep, false)
            if (!validToken)
                ref = ref.where('show', '==', true)
            const querySnapshot = await ref.get()
            return querySnapshot.docs.map(doc => {
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

export const setResume = (dbx: Dropbox) => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        if (await auth.methods.checkToken(req, rep))
            try {
                const resumeFields: any = req.body
                resumeFields.skills = resumeFields?.skills?.map(skill => {
                    return resumeDb.skills.doc(skill.id)
                })
                resumeFields.social = resumeFields?.social?.map(social => {
                    return resumeDb.social.doc(social.id)
                })
                resumeFields.experience = resumeFields?.experience?.map(exp => {
                    return resumeDb.timeNotes.doc(exp.id)
                })
                resumeFields.education = resumeFields?.education?.map(edu => {
                    return resumeDb.timeNotes.doc(edu.id)
                })
                if (!!resumeFields.photo){
                    const image = resumeFields.photo
                    let imagePath = `/resume/${resumeFields.id}/${+new Date()}.${image.type}`
                    await dbxController.methods.uploadImg(Buffer.from(image.buffer), imagePath, dbx)
                    resumeFields.photo = {
                        ...await dbxController.methods.getImgLinks(imagePath, dbx),
                        alt: {
                            en: 'Nikolay Dorofeev',
                            ru: 'Николай Дорофеев'
                        }
                    }
                }
                return await resumeDb.resume
                    .doc(resumeFields['id'])
                    .set({ ...resumeFields, id: undefined}, {merge: true})
            } catch (err){
                throw boomify(err)
            }
    }
}
export const checkResumeId = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.resume.doc(req.params['resumeId']).get()
            return ref.exists
        } catch (err){
            throw boomify(err)
        }
    }
}
export const getAllSocials = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.social.get()
            return ref.docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.data()?.title
                }
            })
        } catch (err){
            throw boomify(err)
        }
    }
}


export const getSocial = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.social.doc(req.params['socialId']).get()

            return {
                ...ref.data(),
                id: ref.id
            }
        } catch (err){
            throw boomify(err)
        }
    }
}

export const checkSocialId = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.social.doc(req.params['socialId']).get()
            return ref.exists
        } catch (err){
            throw boomify(err)
        }
    }
}

export const setSocial = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        if (await auth.methods.checkToken(req, rep))
            try {
                const social: Object = req.body
                return await resumeDb.social.doc(social['id']).set({ ...social, id: undefined})
            } catch (err){
                throw boomify(err)
            }
    }
}

export const getAllSkillsNotes = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.skills.get()
            return ref.docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.data()?.title
                }
            })
        } catch (err){
            throw boomify(err)
        }
    }
}


export const getSkillsNote = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.skills.doc(req.params['skillId']).get()

            return {
                ...ref.data(),
                id: ref.id
            }
        } catch (err){
            throw boomify(err)
        }
    }
}

export const checkSkillId = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.skills.doc(req.params['skillId']).get()
            return ref.exists
        } catch (err){
            throw boomify(err)
        }
    }
}

export const setSkillsNote = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        if (await auth.methods.checkToken(req, rep))
            try {
                const skillsNote: Object = req.body
                return await resumeDb.skills.doc(skillsNote['id']).set({ ...skillsNote, id: undefined})
            } catch (err){
                throw boomify(err)
            }
    }
}

export const getAllExpTimeNotes = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.timeNotes
                .where('experience', '==', true)
                .get()
            return ref.docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.data()?.title
                }
            })
        } catch (err){
            throw boomify(err)
        }
    }
}

export const getAllEduTimeNotes = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.timeNotes
                .where('education', '==', true)
                .get()
            return ref.docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.data()?.title
                }
            })
        } catch (err){
            throw boomify(err)
        }
    }
}


export const getTimeNote = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.timeNotes.doc(req.params['timeNoteId']).get()
            if (ref.exists)
                return {
                    ...ref.data(),
                    id: ref.id
                }
            else {
                rep.code(404)
                return "Time note not found."
            }
        } catch (err){
            throw boomify(err)
        }
    }
}

export const checkTimeNoteId = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const ref = await resumeDb.timeNotes.doc(req.params['timeNoteId']).get()
            return ref.exists
        } catch (err){
            throw boomify(err)
        }
    }
}

export const setTimeNote = () => {
    return  async (req: FastifyRequest, rep: FastifyReply) => {
        if (await auth.methods.checkToken(req, rep))
            try {
                const timeNote: any = req.body
                return await resumeDb.timeNotes
                    .doc(timeNote['id'])
                    .set({
                        ...timeNote,
                        period: {
                          begin: firestore.Timestamp.fromDate(new Date(timeNote.period.begin)),
                          end: firestore.Timestamp.fromDate(new Date(timeNote.period.end))
                        },
                        id: undefined
                    })
            } catch (err){
                throw boomify(err)
            }
    }
}
