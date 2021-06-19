import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import { authDb } from '../server'

export const authorizeByPwd = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const authData: any = req.body
            console.log(authData)
            const userToAuth = await authDb.users.findOne({where: { login: authData?.login }})
            if (!userToAuth) {
                rep.code(404)
                return `Error: no user with login ${authData.login}`
            }
            if (authData?.password === userToAuth.password) {
                await userToAuth.getTokens()
                userToAuth.tokens?.forEach(token => {
                    if (new Date(token.expireAt) < new Date())
                        token.destroy()
                })
                const expireDate = new Date()
                expireDate.setDate(expireDate.getDate() + 7)
                const token = await userToAuth.createToken({expireAt: expireDate, userId: userToAuth.id})
                return token
            }
            rep.code(401)
            return 'Password is incorrect'
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const authorizeByToken = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const authData: any = req.body
            const tokenInDb = await authDb.tokens.findByPk(authData?.token)
            if (!tokenInDb) {
                rep.code(404)
                return `Error: token not found`
            }
            if (new Date(tokenInDb.expireAt) > new Date()) {
                const expireDate = new Date()
                expireDate.setDate(expireDate.getDate() + 7)
                tokenInDb.expireAt = expireDate.toISOString()
                await tokenInDb.save()
                rep.code(200)
                return await tokenInDb.getUser()
            }
            await tokenInDb.destroy()
            rep.code(401)
            return 'Token expired'
        } catch (err) {
            throw boomify(err)
        }
    }
}
export const unauthorize = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            console.log(req.body)
            const authData: any = req.body
            const tokenInDb = await authDb.tokens.findByPk(authData?.token)
            if (!tokenInDb) {
                rep.code(404)
                return `Error: token not found`
            }
            await tokenInDb.destroy()
            return 'Unauthorised successful'
        } catch (err) {
            throw boomify(err)
        }
    }
}

export const methods = {
    checkToken: async (req: FastifyRequest, rep: FastifyReply) => {
        const token = req.headers?.authorization
        if (!token) {
            rep.code(401)
            rep.send('No token')
            return false
        }
        const tokenInDb = await authDb.tokens.findByPk(token)
        if (!tokenInDb || new Date(tokenInDb.expireAt) < new Date()){
            await tokenInDb?.destroy()
            rep.code(401)
            rep.send('Unauthorised')
            return false
        }
        return true
    }
}
