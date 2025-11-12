const express = require("express");
const { addtocartControllers, getcartControllers, getSinglecartControllers, updatecartControllers } = require("../../../controllers/cartControllers");
const router = express.Router();

router.post("/addtocart", addtocartControllers );

router.get("/getallcart" , getcartControllers);

router.get("/singlecart/:id" , getSinglecartControllers );

router.patch("/updatecart/:id", updatecartControllers)


module.exports = router;
