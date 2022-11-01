const fs = require('fs')

async function readFile(path,folder) {

    const file =  await fs.promises.readFile(path, 'utf-8')
    const size =  (await fs.promises.stat(path)).size
    const prearr = file.split("\r\n") // enable dyamic multiple rows
    const arr = prearr.map((v) => v.split(/[,|]/))
    arr.pop()
    
    return [arr, size]
}

module.exports = readFile