import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import {Dropbox} from "dropbox"
import {createPlaceholder} from "../classes/imageWorker/createPlaceholder";
import {authDb} from "../server";

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
            const svg = await createPlaceholder(req.body['path'], dbx)
            return await dbx.filesUpload({path: `/svg-placeholders/${+new Date()}.svg`, contents: svg})
        } catch (err){
            throw boomify(err)
        }
    }
}

export const getImageLinks = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await methods.getImgLinks(req.query['path'], dbx)
        } catch (err){
            throw boomify(err)
        }
    }
}

export const methods = {
    async getImgLinks(path: string, dbx: Dropbox){
        const imgPair = await authDb.imgPairs.findByPk(path)
        let phImg = ''
        if (!imgPair){
            phImg = path.split('.')[0] + `.svg`
            const svg = await createPlaceholder(path, dbx)
            await dbx.filesUpload({path: phImg, contents: svg})
            await authDb.imgPairs.create({ originalPath: path, placeholderPath: phImg })
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
    },
    async uploadImg(image: ArrayBuffer, path: string, dbx: Dropbox){
        await dbx.filesUpload( { path, contents: image } )
    }
}
