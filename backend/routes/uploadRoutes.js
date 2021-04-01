import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

/*const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return null, true
  } else {
    cb('Images only !')
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  try {
    console.log('image test')
    res.send(`/${req.file.path}`)
  } catch (error) {
    console.error(error)
  }
})*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    //console.log(file)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })
router.post('/', upload.single('image'), (req, res, next) => {
  try {
    res.send(`/${req.file.path}`)
  } catch (error) {
    console.error(error)
  }
})
export default router
