const express = require("express");
const { subCategoryControllers, addsubCategoryControllers, deletesubCategoryControllers } = require("../../../controllers/subcategoryControllers");
const { TokenCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authMiddleware");


const router = express.Router();

router.post("/addsubcategory", TokenCheckMiddleware , adminCheckMiddleware ,addsubCategoryControllers );


router.delete("/deletesubcategory/:id", TokenCheckMiddleware, adminCheckMiddleware, deletesubCategoryControllers );

module.exports = router;
