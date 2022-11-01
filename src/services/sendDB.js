const connection = require('./db')

async function sendDB(folder,data) {
    const queryStr = `INSERT INTO ${folder} VALUES ? `
    console.log(data)
    try {
      await (await connection).query(queryStr,[data])
      return true
    } catch {
      return false
    }
}

module.exports = sendDB