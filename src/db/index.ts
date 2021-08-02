import {Sequelize} from "sequelize"
import * as config from '../config'

import * as authModels from "./auth";
import * as projectsModels from "./projects";
import * as firebase from "firebase-admin"

export const initDbs = (firebaseApp: firebase.app.App) => {
    // Подключение к Postgres Auth
    const sequelizeAuth = new Sequelize(
        process.env.DB_AUTH_DB,
        process.env.DB_AUTH_USER,
        process.env.DB_AUTH_PWD,
        require('./auth/seq-options.json'))

    const authDb = authModels.initModels(sequelizeAuth)

    sequelizeAuth.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL auth connected…')
        })
        .catch(err => console.error(err));

    // Подключение к Postgres Projects
    const sequelizeProjects = new Sequelize(
        process.env.DB_PROJECTS_DB,
        process.env.DB_PROJECTS_USER,
        process.env.DB_PROJECTS_PWD,
        require('./projects/seq-options.json'))

   const projectsDb = projectsModels.initModels(sequelizeProjects)

    sequelizeProjects.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL projects connected…')
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
    return { authDb, projectsDb, resumeDb }
}

