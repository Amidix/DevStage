import path from 'path'
import express from 'express'
import multer from 'multer'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
const router = express.Router()

aws.config.update({
  endPoint: process.env.AWS_URL,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_DEFAULT_REGION,
})

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
/*in case
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
*/
var s3 = new aws.S3({})
const storage = multerS3({
  s3: s3,
  bucket: 'autoliyastorage',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    console.log('success' + file)
    cb(null, file.originalname)
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

const limits = {
  fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
})

router.post('/', upload.single('image'), (req, res, next) => {
  try {
    res.send(
      `https://autoliyastorage.s3.us-east-2.amazonaws.com/${req.file.originalname}`
    )
  } catch (error) {
    console.error(error)
  }
})
export default router
