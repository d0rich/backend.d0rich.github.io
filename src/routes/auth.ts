import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify"

import * as authController from '../controllers/auth'


export default function(fastify: FastifyInstance){
    fastify.post('/api/auth/byPwd', authController.authorizeByPwd())
    fastify.post('/api/auth/byToken', authController.authorizeByToken())
    fastify.post('/api/auth/logout', authController.unauthorize())
}
