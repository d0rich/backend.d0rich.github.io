import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import {Dropbox} from "dropbox"
import {createPlaceholder} from "../classes/imageWorker/createPlaceholder";
import {db} from "../server";

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
            const result = await dbx.sharingCreateSharedLink({path: req.query['path'] })
            return result.result.url.replace('?dl=0', '?dl=1')
            //return (await dbx.filesGetTemporaryLink({ path: req.query['path'] })).result.link
        } catch (err){
            throw boomify(err)
        }
    }
}
export const generatePlaceholder = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const svg = await createPlaceholder(req.query['path'], dbx)
            return await dbx.filesUpload({path: `/svg-placeholders/${+new Date()}.svg`, contents: svg})
        } catch (err){
            throw boomify(err)
        }
    }
}

export const methods = {
    async getImgLinks(path: string, dbx: Dropbox){
        const imgPair = await db.imgPairs.findByPk(path)
        let phImg = ''
        if (!imgPair){
            phImg = `/svg-placeholders/${+new Date()}.svg`
            const svg = await createPlaceholder(path, dbx)
            await dbx.filesUpload({path: phImg, contents: svg})
            await db.imgPairs.create({ originalPath: path, placeholderPath: phImg })
        }
        else {
            phImg = imgPair['placeholderPath']
        }
        const phImgSrc = await dbx.sharingCreateSharedLink({path: phImg })
        const mainImgSrc = await dbx.sharingCreateSharedLink({path: path })

        return {
            src: mainImgSrc.result.url.replace('?dl=0', '?raw=1'),
            phSrc: phImgSrc.result.url.replace('?dl=0', '?raw=1')
        }
    }
}
