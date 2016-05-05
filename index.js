import {send} from 'micro-core'
import {readFile} from 'fs'

const readFileAsync = (file) => new Promise((resolve, reject) => readFile(file, (err, data) => {
    if (err) return reject(err)

    return resolve(data.toString('utf-8'))
}))
const isStaticAsset = new RegExp(/.*[\.js\.tag\.html]$/)
const serveStatic = async (path) => readFileAsync(`${__dirname}/public/${path}`)
const dummyData = {
    chart: {
        type: 'doughnut', // line|bar|radar|polar|pie|doughnut
        options: {}, // Look at Chart.js documentation on how to populate data and options
        data: [{
          value: 300,
          color: "#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
        }, {
          value: 50,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
        }, {
          value: 100,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
        }]
    }
}

export default async function (req, res) {
    if (req.url.match(isStaticAsset)) {
        console.log(req.url)
        return send(res, 200, await serveStatic(req.url))
    }

    const tmpl = await serveStatic('index.html')

    return send(res, 200, tmpl.replace('window.__data__', JSON.stringify(dummyData)))
}
