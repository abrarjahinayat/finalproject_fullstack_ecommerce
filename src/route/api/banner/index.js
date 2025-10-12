const express = require("express");
const path = require("path");

const addbannerControllers = require("../../../controllers/bannerControllers");
const multerImgUpload = require("../../../utils/multer.img.upload");

const router = express.Router();


const upload = multerImgUpload();


router.post("/addbanner", upload.single("banner"), addbannerControllers);

module.exports = router;
