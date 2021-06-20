import mongoose from "mongoose";
import {Sequelize} from "sequelize"
import * as config from '../config'

import * as authModels from "./auth";
import * as projectsModels from "./projects";
import * as firebase from "firebase-admin"

export const initDbs = (firebaseApp: firebase.app.App) => {
    // Подключение к mongodb
    mongoose.connect(config.mongoDbUri, {useUnifiedTopology: true})
        .then(() => console.log('MongoDB connected…'))
        .catch(err => console.log(err))

    // Подключение к Postgres Auth
    const sequelizeAuth = new Sequelize(
        'd1aan3grkqof40',
        'ikfdkqogzxvpng',
        'cb7ec5210e19f9be4d84699912aa814d0120706905e871755e6b4cb06877a26a',
        require('./auth/seq-options.json'))

    const authDb = authModels.initModels(sequelizeAuth)

    sequelizeAuth.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL auth connected…')
        })
        .catch(err => console.error(err));

    // Подключение к Postgres Projects
    const sequelizeProjects = new Sequelize(
        'd9vnno52oduo3',
        'biwicxszdsocmb',
        'b12f81fac7497f27ded8d710d99a3057cd1c2a3d1317c0f63047297df55c82d2',
        require('./projects/seq-options.json'))

   const projectsDb = projectsModels.initModels(sequelizeProjects)

    sequelizeProjects.sync({ force: false, alter: false })
        .then(result => {
            console.log('PostgreSQL projects connected…')
        })
        .catch(err => console.error(err));

    // Подключение к firestore
    const firestore = firebaseApp.firestore()
    const resumeDb = {
        resume: firestore.collection('resume'),
        images: firestore.collection('images'),
        education: firestore.collection('education'),
        skills: firestore.collection('skills'),
        social: firestore.collection('social')
    }
    return { authDb, projectsDb, resumeDb }
}

