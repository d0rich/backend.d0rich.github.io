import {Dropbox} from "dropbox";

const Handlebars = require('handlebars')
const rgbHex     = require('rgb-hex')
import sizeOf     from 'image-size'
import * as path from "path";
const triangulate = require('delaunay-triangulate')
const getPixels = require('get-pixels')
const fs         = require('fs')


export const createPlaceholder = async (filepath: string, dbx: Dropbox) => {

    const data = await dbx.filesDownload({path: filepath})

    const image = Buffer.from((<any> data).result.fileBinary)

    const size   = sizeOf(image)
    const height = size.height
    const width  = size.width

    let svg = null

    getPixels(image, `image/${path.extname(filepath).replace('.','')}`, (err, pixels) => {
        // Генерируем вершины треугольников
        const basePoints = [];

        for (let x = 0; x <= 100; x += 10) {
            for (let y = 0; y <= 100; y += 10) {
                const point = [x, y];

                if ((x >= 10) && (x <= 90)) {
                    point[0] += Math.floor(20 * Math.random() - 10);
                }

                if ((y >= 10) && (y <= 90)) {
                    point[1] += Math.floor(20 * Math.random() - 10);
                }

                basePoints.push(point);
            }
        }

        const triangles = triangulate(basePoints);

        //Вычисляем цвета треугольников

        const polygons = [];

        triangles.forEach((triangle) => {
            let x = Math.floor((basePoints[triangle[0]][0]
                + basePoints[triangle[1]][0]
                + basePoints[triangle[2]][0]) / 3);

            let y = Math.floor((basePoints[triangle[0]][1]
                + basePoints[triangle[1]][1]
                + basePoints[triangle[2]][1]) / 3);

            if (x === 100) {
                x = 99;
            }

            if (y === 100) {
                y = 99;
            }

            const realX = Math.floor(x * width / 100);
            const realY = Math.floor(y * height / 100);

            const pixelPosition = 4 * (realY * width + realX);

            const rgb = [
                pixels.data[pixelPosition],
                pixels.data[pixelPosition + 1],
                pixels.data[pixelPosition + 2]
            ];

            const color = '#' + rgbHex(...rgb);

            const points = ' '
                + basePoints[triangle[0]][0] + ','
                + basePoints[triangle[0]][1] + ' '
                + basePoints[triangle[1]][0] + ','
                + basePoints[triangle[1]][1] + ' '
                + basePoints[triangle[2]][0] + ','
                + basePoints[triangle[2]][1];

            polygons.push({points, color});
        });

        const template = Handlebars.compile(fs.readFileSync('./triangulate-template.svg', 'utf-8'))
        svg = template({height, width, polygons})
    })
    return svg

}
