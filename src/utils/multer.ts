import * as aws from 'aws-sdk'
import * as multer from 'multer'
import * as dotenv from 'dotenv';
import { Request } from 'express';
dotenv.config();

//const s3Storage = require('multer-sharp-s3');
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.SECRETACCESSKEY,
  accessKeyId: process.env.ACCESSKEYID,
  region: process.env.REGION
});

const s3 = new aws.S3();

const options = {
    s3: s3,
    bucket: process.env.BUCKET,
    acl: process.env.ACL,
    /*resize: [
      { suffix: 'sm', width: 300 },
      { suffix: 'xs', width: 100 },
      { suffix: 'xlg', width: 1200, height: 1200 },
      { suffix: 'lg', width: 800, height: 800 },
      { suffix: 'md', width: 500, height: 500 },
      { suffix: 'original' }
    ]*/
    key: function (req :Request , file : any, cb : any) {
      let date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      
      let path = `${year}/${month}/${day}/${date.getTime()}/${file.originalname.replace(/ /gi, "").replace(".album" , ".jpeg")}`;

      cb(null, path)
    }
  }


const upload = multer({ storage: multerS3(options)})

export default upload