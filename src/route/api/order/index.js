const express = require("express");
const { ordereControllers, getallordersControllers,  } = require("../../../controllers/orderControllers");

const router = express.Router();

router.post("/createorder", ordereControllers );

router.get("/getallorders", getallordersControllers )

module.exports = router;
