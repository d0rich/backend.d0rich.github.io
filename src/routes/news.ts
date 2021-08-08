import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as newsController from '../controllers/news'


export default function(fastify: FastifyInstance, dbx: Dropbox){
    fastify.post('/api/news/edit', newsController.createOrEditNews(dbx))
}
