import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import * as dbxController from "./dropbox";
import * as authController from "./auth";
import {projectsDb, newsDb} from '../server'
import {Dropbox} from "dropbox";
const { convert } = require('html-to-text');
import {fn, Op, literal} from "sequelize";

export const getNewsFeed = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const projectsOnPage: number = + req.query['onPage'] || 6
            const pageNumber: number = + req.query['page'] || 1
            let tags: number[] = req.query['tags']
                ?.split(',')
                .map(id => +id)
                .filter(id => id !== 0) || []
            let where = null
            if (tags.length > 0){
                const tags_projects = await projectsDb.projects_tags.findAll({
                    attributes: ['projectId'],
                    where: { tagId: tags.length === 0 ? {[Op.ne] : null} : { [Op.in]: tags } }
                })
                const projectIds = Array.from(new Set( tags_projects.map(tp => tp.projectId) ))
                where = { id: { [Op.in]: projectIds }}
            }

            let projects = await projectsDb.projects.findAll( {
                order: [['date', 'DESC']],
                limit: projectsOnPage,
                offset: projectsOnPage * (pageNumber - 1),
                attributes: ['id', 'stringId', 'title', 'date', 'imgUrl'],
                where,
                include: [
                    { model: projectsDb.tags, as: 'tagId_tags', through: { attributes: [] } }
                ]
            })
            let count = await projectsDb.projects.count( { attributes: [], where })

            projects.forEach(pr => {
                pr.tagId_tags.sort((a, b) => {
                    if (a.text < b.text) return -1
                    if (a.text > b.text) return 1
                    return 0
                })
            })
            return {
                pages: Math.ceil(count / projectsOnPage),
                count: count,
                projects: projects}
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getNews = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const  project = await projectsDb.projects.findOne( {
                where: {
                    stringId: req.params['stringId']
                },
                include: [
                    { model: projectsDb.tags, as: 'tagId_tags', through: { attributes: [] } },
                    {
                        model: projectsDb.technologies,
                        as: 'technologyId_technologies',
                        through: { attributes: ['version'] }
                    }
                ]
            })
            project.tagId_tags.sort((a, b) => {
                if (a.text < b.text) return -1
                if (a.text > b.text) return 1
                return 0
            })
            project.technologyId_technologies.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
            })
            return project
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getNewsById = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await projectsDb.projects.findOne( {
                where: {
                    id: req.params['projectId']
                },
                include: [
                    { model: projectsDb.tags, as: 'tagId_tags', through: { attributes: [] } },
                    {
                        model: projectsDb.technologies,
                        as: 'technologyId_technologies',
                        through: { attributes: ['version'] }
                    }
                ]
            })
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const checkNewsStringId = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await projectsDb.projects.findOne(
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
                return await projectsDb.projects.destroy(
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
