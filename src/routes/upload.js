const fs = require("fs")
const express = require('express');
const formidable = require('formidable');
const formatDate = require('../function/formatDate')
const checkPath = require('../function/checkPath')
const readFile = require('../function/readFile');
const sendDB = require('../services/sendDB');

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:folder',checkPath("../upload/"), (req,res,next) => {
  let options = {
    multiples: true, 
    uploadDir: req.res.locals.monthPath, 
    keepExtensions: true, 
    allowEmptyFiles: false,
    filename: function (name,ext,part,form) { 
      return formatDate(new Date(),"ddMMyy-HHmmss") + "_" + part.originalFilename }
  }
  
  console.log("option", options.filename)
  let form = formidable(options);

   form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err)
    return
    }

    console.log(`Received ${files.file.newFilename}`)
    res.locals.fileName = files.file.newFilename
    res.locals.prevPath = req.res.locals.monthPath + "/" + req.res.locals.fileName
    const [data,filesize] = await readFile(res.locals.prevPath,req.params.folder)
    if (await sendDB(req.params.folder,data)) {
      console.log(`File Size: ${filesize}`)
      res.json(filesize)
      next('route')
    } else {
      console.log(`File Size: 0`)
      res.json(0)
    }

  })
})

router.post('/:folder',checkPath("../backup/"), async (req,res,next) => {
  const filePath = req.res.locals.monthPath + "/" + req.res.locals.fileName
  await fs.promises.rename(req.res.locals.prevPath,filePath)
  console.log("Moved!")
})

module.exports = router