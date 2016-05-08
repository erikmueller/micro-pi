import {send} from 'micro-core'
import {readFile} from 'fs'
import {rawToArray, toChartData} from './utils/format'
import * as filter from './utils/filter'

const readFileAsync = (file) => new Promise((resolve, reject) => readFile(file, (err, data) => {
    if (err) return reject(err)

    return resolve(data.toString('utf-8'))
}))
const isStaticAsset = new RegExp(/.*[\.js\.tag\.html]$/)
const serveStatic = async (path) => readFileAsync(`${__dirname}/public/${path}`)

export default async function (req, res) {
    if (req.url.match(isStaticAsset)) {
        return send(res, 200, await serveStatic(req.url))
    }

    const tmpl = await serveStatic('index.html')
    const completeData = rawToArray(await readFileAsync(`${__dirname}/sensor_data`))
    const lastDayData = filter.lastDay(completeData)

    const data = toChartData(lastDayData)

    return send(res, 200, tmpl.replace(/window.__data__/g, JSON.stringify(data)))
}
