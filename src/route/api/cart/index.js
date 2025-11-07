const express = require("express");
const { addtocartControllers, getcartControllers, getSinglecartControllers } = require("../../../controllers/cartControllers");
const router = express.Router();

router.post("/addtocart", addtocartControllers );

router.get("/getallcart" , getcartControllers);

router.get("/singlecart/:id" , getSinglecartControllers );


module.exports = router;
