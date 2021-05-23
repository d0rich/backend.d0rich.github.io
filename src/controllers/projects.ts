import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import * as dbxController from "./dropbox";
import * as authController from "./auth";
import { db, projectsDb } from '../server'
import {Dropbox} from "dropbox";
import {projects} from "../models/projects";

export const getAllTags = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await projectsDb.tags.findAll()
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
            return await projectsDb.technologies.findAll()
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
                let imagePath = ''
                if (!!image){
                    imagePath = `/projects/${+new Date()}.${image.type}`
                    await dbxController.methods.uploadImg(Buffer.from(image.buffer), imagePath, dbx)
                }
                const projectInDb = await projectsDb.projects.findByPk(req.body['id'])
                if (!!projectInDb){
                    projectInDb.title = req.body['title']
                    projectInDb.stringId = req.body['stringId']
                    projectInDb.description = req.body['description']
                    projectInDb.date = req.body['date']
                    if (imagePath)
                        projectInDb.imgPath = imagePath
                    await setTagsAndTechs(projectInDb, req)
                    return await projectInDb.save()
                }
                const newProject = await projectsDb.projects.create({
                    date: req.body['date'],
                    imgPath: imagePath,
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
    await project.setTechnologies_in_projects(
        await Promise.all(req.body['technologies'].map(async tech => {
            const techInProject = new projectsDb.technologies_in_project({
                projectId: project.id,
                technologyId: tech.id,
                version: tech.version
            })
            await projectsDb.technologies.update(
                { name: tech.name, url: tech.url },
                { where: { id: tech.id } })
            return techInProject
        })))
    return project
}

export const methods = {

}
