import {send} from 'micro-core';
import {readFile} from 'fs'

const readFileAsync = (file) => new Promise((resolve, reject) => readFile(file, (err, data) => {
    if (err) return reject(err);

    return resolve(data.toString('utf-8'));
}))

export default async function (req, res) {
    const tmpl = await readFileAsync(`${__dirname}/index.html`)

    send(res, 200, tmpl);
}
