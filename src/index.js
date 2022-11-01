require('dotenv').config()
const express = require('express')
const upload = require('./routes/upload')
const connection = require('./services/db')

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/upload',upload)

function logUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

app.get('/', logUrl, (req, res) => {
  res.send('Hello World!')
});

app.route('/:folder')
  .get((req, res, next) => {
    if (req.params.folder == "MED") {
      res.send(req.params.folder)
    }
    else next()
  })
  .get((req, res) => {
    connection.query('SELECT * FROM test AS solution', (err, rows, fields) => {
      if (err) throw err
      mc = ""
      rows.map((row) => {
        console.log('The solution is: ', row.mcNo)
        mc += row.mcNo + " "
      })
      res.send(mc)
    })
  })


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
