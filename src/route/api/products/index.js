const express = require("express");
const { addproductControllers, getallproductControllers, getleastproductControllers, deleteproductControllers } = require("../../../controllers/addproductControllers");
const upload = require("../../../utils/multer.img.upload");
const router = express.Router();


router.post("/addproduct", upload.array("product"),addproductControllers );

router.get("/allproducts", getallproductControllers );
router.get("/leastproduct", getleastproductControllers );
router.delete("/deleteproduct/:id", deleteproductControllers);

module.exports = router;
