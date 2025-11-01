const express = require("express");
const { addproductControllers, getallproductControllers } = require("../../../controllers/addproductControllers");
const upload = require("../../../utils/multer.img.upload");
const router = express.Router();


router.post("/addproduct", upload.array("product"),addproductControllers );

router.get("/allproducts", getallproductControllers );

module.exports = router;
