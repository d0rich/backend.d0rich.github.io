const getHomePageData = require('./getHomePageData')
const getNavPanelData = require('./getNavPanelData')
const getPricesPageData = require('./getPricesPageData')
const getProjects = require('./getProjects')
const getProject = require('./getProject')

module.exports = function(app, db) {

    getHomePageData(app, db);
    getNavPanelData(app, db);
    getPricesPageData(app, db);
    getProjects(app, db);
    getProject(app, db);

};