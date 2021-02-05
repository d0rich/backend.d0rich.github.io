import {FastifyInstance} from "fastify";

export default function (fastify: FastifyInstance){
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })
}
