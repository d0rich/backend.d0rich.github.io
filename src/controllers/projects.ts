import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import * as dbxController from "./dropbox";
import * as authController from "./auth";
import {projectsDb} from '../server'
import {Dropbox} from "dropbox";
import {projects} from "../db/projects";
import {fn, Op, literal} from "sequelize";

export const getProjects = () => {
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

export const getProject = () => {
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

export const getProjectById = () => {
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

export const getAllTags = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await projectsDb.tags.findAll({ order: ['text'] })
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const getTagsForFilters = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await projectsDb.tags.findAll({
                group: ['projects_tags.tagId', 'tags.id'],
                order: [[literal('projects'), 'DESC'], 'text'],
                attributes: [ 'id', 'text', [fn('count', 'projects_tags.tagId'), 'projects'] ],
                include: { model: projectsDb.projects_tags, attributes: [], as: 'projects_tags', required: true }
            })
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const createTag = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        if (await authController.methods.checkToken(req, rep))
            try {
                return await projectsDb.tags.create({text: req.body['text']})
            } catch (err) {
                throw boomify(err)
            }
    }
}

export const getAllTechnologies = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await projectsDb.technologies.findAll({order: ['name']})
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const editTechnology = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        if (await authController.methods.checkToken(req, rep))
            try {
                const techInDb = await projectsDb.technologies.findByPk(req.body['id'])
                if (!techInDb){
                    return await projectsDb.technologies.create({name: req.body['name'], url:req.body['url']})
                }
                if (req.body['name'])
                    techInDb.name = req.body['name']
                if (req.body['url'])
                    techInDb.url = req.body['url']
                return await techInDb.save()
            } catch (err) {
                throw boomify(err)
            }
    }
}

export const checkProjectStringId = () => {
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

export const createOrEditProject = (dbx: Dropbox) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        if (await authController.methods.checkToken(req, rep))
            try {
                const image = req.body['image']
                let links = {}
                if (!!image){
                    let imagePath = `/projects/${req.body['stringId']}/${+new Date()}.${image.type}`
                    await dbxController.methods.uploadImg(Buffer.from(image.buffer), imagePath, dbx)
                    links = await dbxController.methods.getImgLinks(imagePath, dbx)
                }
                const projectInDb = await projectsDb.projects.findByPk(req.body['id'])
                if (!!projectInDb){
                    projectInDb.title = req.body['title']
                    projectInDb.stringId = req.body['stringId']
                    projectInDb.description = req.body['description']
                    projectInDb.date = req.body['date']
                    projectInDb.githubUrl = req.body['githubUrl']
                    projectInDb.url = req.body['url']
                    if (links['src'])
                        projectInDb.imgUrl = [links['src'], links['phSrc']]
                    await setTagsAndTechs(projectInDb, req)
                    return await projectInDb.save()
                }
                const newProject = await projectsDb.projects.create({
                    date: req.body['date'],
                    imgUrl: [links['src'], links['phSrc']],
                    description: req.body['description'],
                    stringId: req.body['stringId'],
                    title: req.body['title'],
                    url: req.body['url'],
                    githubUrl: req.body['githubUrl']
                })
                await setTagsAndTechs(newProject, req)
                return await newProject.save()
            } catch (err) {
                throw boomify(err)
            }
    }
}

const setTagsAndTechs = async (project: projects, req: FastifyRequest) => {
    await project.setTagId_tags( req.body['tags'] )
    const editTechnologiesPromises = []
    req.body['technologies'].forEach(tech => {
        editTechnologiesPromises.push(projectsDb.technologies.update(
            { name: tech.name, url: tech.url },
            { where: { id: tech.id } }))
    })
    await Promise.all(editTechnologiesPromises)
    await projectsDb.technologies_in_project.destroy({where: {projectId: project.id}})
    await projectsDb.technologies_in_project.bulkCreate(
        req.body['technologies'].map(tech => {
            return {
                projectId: project.id,
                technologyId: tech.id,
                version: tech.version
            }
        })
    )
    return project
}

export const deleteProject = () => {
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
