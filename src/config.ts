const mongoDb = {
    dbname: 'Dorich',
    user: {
        login: 'CommonUser',
        password: 'jd6-7fS-SMh-peY'
    }
}

export const mongoDbUri = `mongodb+srv://${mongoDb.user.login}:${mongoDb.user.password}@main.fvzm6.mongodb.net/${mongoDb.dbname}?retryWrites=true&w=majority`
export const swagger = {
    options: {
        routePrefix: '/documentation',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Dorich site API',
                description: 'API special for dorich site',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'https://dorich-server.herokuapp.com',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    }
}
export const dropbox = {
    app_key: '0yigcvkvvvrbtf2',
    app_secret: 'od6gpz9gv2frkex',
    token: '8gwt88-F0vcAAAAAAAAAAXz3osFK7ZeTZaopG6AIVy5KUtq9QEFzD1zRvTENwzVP'
}
