const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const keys = require('../keys')

const s3 = new aws.S3({
  accessKeyId: keys.s3AccessKeyId,
  secretAccessKey: keys.s3SecretAccessKey
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'alpinweb-files',
    acl: 'public-read',
    key (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`)
    }
  })
})

module.exports = upload
