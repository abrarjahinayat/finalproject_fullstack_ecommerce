const couponModel = require("../model/coupon.model");


const createCouponControllers = async (req, res) => {

    try {
        let { code,  minPrice, amout } = req.body;

        // Check if coupon code already exists
        const existingCoupon = await couponModel.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({message: "Coupon code already exists"});
        }

        const newCoupon = new couponModel({ code, minPrice, amout });
        await newCoupon.save();

        return res.status(201).json({ success: true, message: "Coupon created successfully", data: newCoupon});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message || error});
    }


};

const applyCouponControllers = async (req, res) => {

};

const deleteCouponControllers = async (req, res) => {};

module.exports = {
  createCouponControllers,
  applyCouponControllers,
  deleteCouponControllers,
};