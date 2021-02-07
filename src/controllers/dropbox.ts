import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import {Dropbox} from "dropbox"

export const getFiles = (dbx: Dropbox) => {
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
            return (await dbx.filesGetTemporaryLink({ path: req.query['path'] }))
        } catch (err){
            throw boomify(err)
        }
    }
}