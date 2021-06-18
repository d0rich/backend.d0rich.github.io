import {FastifyInstance} from "fastify"
import {Dropbox} from "dropbox";

import * as seoController from '../controllers/seo'


export default function(fastify: FastifyInstance){
    fastify.get('/seo/sitemap.xml', seoController.generateSiteMap())
}
