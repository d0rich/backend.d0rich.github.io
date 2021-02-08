import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import {Dropbox} from "dropbox"
import {createPlaceholder} from "../classes/imageWorker/createPlaceholder";

export const getFilesList = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return (await dbx.filesListFolder({ path: '' })).result.entries
        } catch (err){
            throw boomify(err)
        }
    }
}
export const getFile = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return (await dbx.filesGetTemporaryLink({ path: req.query['path'] })).result.link
        } catch (err){
            throw boomify(err)
        }
    }
}
export const generatePlaceholder = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const svg = await createPlaceholder(req.query['path'], dbx)
            return await dbx.filesUpload({path: '/123.svg', contents: svg})
        } catch (err){
            throw boomify(err)
        }
    }
}
