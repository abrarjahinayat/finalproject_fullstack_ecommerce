const express = require("express");
const addbannerControllers = require("../../../controllers/bannerControllers");
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },

  filename: function (req, file, cb) {
    const randomtext = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let fileextension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + randomtext + '.' + fileextension)
  }
})



const upload = multer({ storage: storage , limits: {fileSize: 1024 * 1024 * 5 } })

const router = express.Router();

router.post("/addbanner", upload.array('banner'), addbannerControllers );

module.exports = router;
