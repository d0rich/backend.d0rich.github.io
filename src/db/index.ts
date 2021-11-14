import {Sequelize} from "sequelize"
import * as config from '../config'

import * as authModels from "./auth";
import * as projectsModels from "./projects";
import * as newsModels from './news/init-models'
import * as firebase from "firebase-admin"

export const initDbs = (firebaseApp: firebase.app.App) => {
    // Подключение к Postgres Auth
    const sequelizeAuth = new Sequelize(
        'd1rrban262o6t',
        process.env.DB_USER_AUTH,
        process.env.DB_PWD_AUTH,
        require('./seq-options.json'))

    const authDb = authModels.initModels(sequelizeAuth)

    sequelizeAuth.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL auth connected…')
        })
        .catch(err => console.error(err));

    // Подключение к Postgres Projects
    const sequelizeProjects = new Sequelize(
        'd2u6a9g2tijuvu',
        process.env.DB_USER_PROJECTS,
        process.env.DB_PWD_PROJECTS,
        require('./seq-options.json'))

   const projectsDb = projectsModels.initModels(sequelizeProjects)

    sequelizeProjects.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL projects connected…')
        })
        .catch(err => console.error(err));

    // Подключение к Postgres News
    const sequelizeNews = new Sequelize(
        'dbk8p3pu57ng98',
        process.env.DB_USER_NEWS,
        process.env.DB_PWD_NEWS,
        require('./seq-options.json'))

    const newsDb = newsModels.initModels(sequelizeNews)

    sequelizeNews.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL news connected…')
        })
        .catch(err => console.error(err));

    // Подключение к firestore
    const firestore = firebaseApp.firestore()
    firestore.settings({
        ignoreUndefinedProperties: true
    })
    const resumeDb = {
        resume: firestore.collection('resume'),
        timeNotes: firestore.collection('timeNotes'),
        skills: firestore.collection('skills'),
        social: firestore.collection('social')
    }
    return { authDb, projectsDb, newsDb, resumeDb }
}

