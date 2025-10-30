const express = require("express");
const { addproductControllers } = require("../../../controllers/addproductControllers");
const router = express.Router();


router.post("/addproduct", addproductControllers );

module.exports = router;
