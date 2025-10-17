const express = require("express");
const { subCategoryControllers } = require("../../../controllers/subcategoryControllers");
const { TokenCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authMiddleware");


const router = express.Router();

router.post("/addsubcategory", TokenCheckMiddleware , adminCheckMiddleware ,subCategoryControllers );

module.exports = router;
