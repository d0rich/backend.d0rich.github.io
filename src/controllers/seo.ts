import {FastifyReply, FastifyRequest} from "fastify"
import {boomify} from 'boom'
import {authDb, projectsDb, resumeDb} from '../server'
import xmlbuilder from "xmlbuilder";

export const generateSiteMap = () => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const baseUrl = 'https://d0rich.github.io/#'
            const sitemap = xmlbuilder.create('urlset', {encoding: 'UTF-8', version: '1.0'})
                .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
                .att('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
            // Функция для добавления адреса на 2 языках
            const addUrl = (sitemap: xmlbuilder.XMLElement,
                            loc: String,
                            priority: Number | undefined = undefined,
                            lastmod: Date | undefined = undefined,
                            changefreg: String | undefined = undefined) => {
                function formatDate(date) {
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    return [year, month, day].join('-');
                }
                let url = sitemap.ele('url')
                url.ele('loc', {}, baseUrl + '/ru' + loc)
                if (priority) {
                    url.ele('priority', {}, priority)
                }
                if (lastmod) {
                    url.ele('lastmod', {}, formatDate(lastmod))
                }
                if (changefreg) {
                    url.ele('changefreg', {}, changefreg)
                }
                url.ele('xhtml:link', {
                    rel: 'alternate',
                    hreflang: 'ru',
                    href: baseUrl + '/ru' + loc
                })
                url.ele('xhtml:link', {
                    rel: 'alternate',
                    hreflang: 'en',
                    href: baseUrl + '/en' + loc
                })
            }
            // Создание xml
            addUrl(sitemap, '/', 1.0, undefined, 'monthly')
            addUrl(sitemap, '/portfolio', 0.8, undefined, 'monthly')
            const projects = await projectsDb.projects.findAll({
                attributes: ['stringId', 'updatedAt'],
                order: [['date', 'DESC']]
            })
            projects.forEach(project => {
                addUrl(sitemap, `/portfolio/${project.stringId}`, 0.7 , project.updatedAt)
            })
            // addUrl(sitemap, '/about', 0.95, undefined, 'monthly')
            const publicResume = await resumeDb.resume
                .where('show', "==", true)
                .get()
            publicResume.docs.forEach(resume => {
                addUrl(sitemap, `/about/resume/${resume.id}`, 0.3, undefined, 'monthly')
            })
            rep.type('text/xml')
            rep.header('charset', 'UTF-8')
            return sitemap.end({pretty: true})
        } catch (err) {
            throw boomify(err)
        }
    }
}
