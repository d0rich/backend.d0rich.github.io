import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as newsController from '../controllers/news'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.post('/api/news/edit', newsController.createOrEditNews(dbx))
    fastify.post('/api/news/delete/:id', newsController.deleteNews())
    fastify.get('/api/news/get/byId/:newsId', newsController.getNewsById())
    fastify.get('/api/news/get/byStringId/:stringId', newsController.getNews())
    fastify.get('/api/news/get/all', newsController.getNewsFeed())
    fastify.get('/api/news/check/stringId/:stringId', newsController.checkNewsStringId())
}
