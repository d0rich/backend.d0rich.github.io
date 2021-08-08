import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import * as dbxController from "./dropbox";
import * as authController from "./auth";
import {projectsDb, newsDb} from '../server'
import {Dropbox} from "dropbox";
const { convert } = require('html-to-text');

export const getNewsFeed = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const newsOnPage: number = + req.query['onPage'] || 10
            const pageNumber: number = + req.query['page'] || 1
            let news = await newsDb.news.findAll( {
                order: [['createdAt', 'DESC']],
                limit: newsOnPage,
                offset: newsOnPage * (pageNumber - 1),
                attributes: ['id', 'stringId', 'title', 'contentShort', 'image', 'createdAt'],
            })
            let count = await newsDb.news.count( { attributes: [] })
            return {
                pages: Math.ceil(count / newsOnPage),
                count: count,
                news: news
            }
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getNews = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const news = await newsDb.news.findOne( {
                where: {
                    stringId: req.params['stringId']
                }
            })
            return news
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getNewsById = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await newsDb.news.findOne( {
                where: {
                    id: req.params['newsId']
                }
            })
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const checkNewsStringId = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await newsDb.news.findOne(
                {
                    where: { stringId: req.params['stringId'] },
                    attributes: ['id']
                } )
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const createOrEditNews = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        if (await authController.methods.checkToken(req, rep))
            try {
                const image = req.body['image']
                const now = new Date()
                let links = {}
                if (!!image){
                    let imagePath = `/news/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
                        +`/${req.body['stringId']}/image.${image.type}`
                    await dbxController.methods.uploadImg(Buffer.from(image.buffer), imagePath, dbx)
                    links = await dbxController.methods.getImgLinks(imagePath, dbx)
                }
                const newsInDb = await newsDb.news.findByPk(req.body['id'])
                if (!!newsInDb){
                    newsInDb.title = req.body['title']
                    newsInDb.stringId = req.body['stringId']
                    newsInDb.content = req.body['content']
                    newsInDb.contentShort = req.body['content'].map(html => convert(html, {wordwrap: 50}))
                    if (links['src'])
                        newsInDb.image = [links['src'], links['phSrc']]
                    return await newsInDb.save()
                }
                const newNews = await newsDb.news.create({
                    title: req.body['title'],
                    image: [links['src'], links['phSrc']],
                    stringId: req.body['stringId'],
                    content: req.body['content'],
                    contentShort: req.body['content'].map(html => convert(html, {wordwrap: 50}))
                })
                return await newNews.save()
            } catch (err) {
                throw boomify(err)
            }
    }
}

export const deleteNews = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        if (await authController.methods.checkToken(req, rep))
            try {
                return await newsDb.news.destroy(
                    {
                        where: {
                            stringId: req.body['stringId'],
                            id: req.params['id']
                        }
                    } )
            } catch (err) {
                throw boomify(err)
            }
    }
}

export const methods = {

}
