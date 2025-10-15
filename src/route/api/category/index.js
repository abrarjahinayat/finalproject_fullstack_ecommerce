const express = require("express");
const path = require("path");
const { TokenCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authMiddleware");
const upload = require("../../../utils/multer.img.upload");
const { addcategoryControllers, deletecategoryControllers } = require("../../../controllers/categoryControllers");

const router = express.Router();


// Add Category Route
router.post("/addcategory", TokenCheckMiddleware, adminCheckMiddleware, upload.single("category"), addcategoryControllers);

// Delete Category Route
router.delete("/deletecategory/:id", TokenCheckMiddleware, adminCheckMiddleware, deletecategoryControllers );



module.exports = router;
