const express = require("express");
const { ordereControllers, getallordersControllers, odersuccessControllers, orderfailControllers, ordercancelControllers,  } = require("../../../controllers/orderControllers");

const router = express.Router();

router.post("/createorder", ordereControllers );

router.get("/getallorders", getallordersControllers );

router.post("/success/:id", odersuccessControllers );

router.post("/fail/:id", orderfailControllers );

router.post("/cancel", ordercancelControllers );

module.exports = router;
