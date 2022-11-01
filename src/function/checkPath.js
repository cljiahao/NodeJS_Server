const fs = require('fs')
const formatDate = require('./formatDate')

function checkPath(basePath) {
    return function (req, res, next) {
      const path = basePath + req.params.folder
      fs.access(path, fs.F_OK, (err) => {
        if (err) { 
          next(err)
        } else {
          const monthPath = path + "/" + formatDate(new Date(),"MMMyy")
          fs.access(monthPath, fs.F_OK, (err) => {
            if (err) { 
              if (err.errno == -4058) {
                fs.mkdirSync(monthPath)
                res.locals.monthPath = monthPath
                next() 
              }
              else {
                next(err)
              } 
            } else { 
              res.locals.monthPath = monthPath
              next()
            }
          })
        }
      })
    }
  }

  module.exports = checkPath