const express = require('express');
const multer = require('multer')
const multerS3 = require('multer-s3')
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const router = express.Router();
const User = require("../model/User");

AWS.config.loadFromPath('./aws_config.json');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const getExtension = (filename) => {
  return filename.split('.').pop();
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'staff-management',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: req.body.field_name });
    },
    key: function (req, file, cb) {
      cb(null, `${req.body.field_name}/${uuidv4()}.${getExtension(file.originalname)}`);
    }
  })
})

router.post('/uploadfile', upload.single('file'), async (req, resp) => {
  try {
    const { email, field_name, ...rest } = req.body;
    if (field_name === "i983") {
      await User.findOneAndUpdate({ email }, { [field_name]: `${req.file.key}`, [`${field_name}_filename`]: req.file.originalname, [`${field_name}_approved`]: false });
    }
    else if (field_name === "opt_ead" || field_name === "opt_stem_ead") {
      await User.findOneAndUpdate({ email }, { [field_name]: `${req.file.key}`, [`${field_name}_filename`]: req.file.originalname, [`${field_name}_start`]: rest.start, [`${field_name}_exp`]: rest.exp });
    }
    else {
      await User.findOneAndUpdate({ email }, { [field_name]: `${req.file.key}`, [`${field_name}_filename`]: req.file.originalname });
    }
    resp.status(200).json({ path: req.file.key });
  }
  catch (e) {
    console.log(e);
    resp.status(400).send('Error')
  }
});

router.post('/getfile', async (req, resp) => {
  const { email, field_name } = req.body;
  try {
    const data = await User.findOne({ email });
    const file_path = data[field_name];
    const params = {
      Bucket: 'staff-management',
      Key: file_path,
    }
    try {
      const file = await s3.getObject(params).promise();
      const base64_str = file.Body.toString('base64');
      resp.status(200).json({ data: `data:${file.ContentType};base64,${base64_str}`, field_name: file.Metadata.fieldname });
    }
    catch (e) {
      console.log(e);
      resp.status(400).send('Error')
    }
  }
  catch (e) {
    console.log(e);
    resp.status(400).send('Error')
  }
});

module.exports = router;