const express = require("express");
const path = require("path");

const { addbannerControllers, deletebannerControllers} = require("../../../controllers/bannerControllers");
const multerImgUpload = require("../../../utils/multer.img.upload");
const { TokenCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authMiddleware");

const router = express.Router();


const upload = multerImgUpload();


router.post("/addbanner", TokenCheckMiddleware, adminCheckMiddleware, upload.single("banner"), addbannerControllers);

router.delete("/deletebanner/:id", deletebannerControllers); 

module.exports = router;
