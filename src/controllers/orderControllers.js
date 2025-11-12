const cartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");

const ordereControllers = async (req, res) => {
  try {
    let {
      user,
      address,
      city,
      phone,
      orderstatus,
      paymentmethod,
      deliverycharge,
      discount,
    } = req.body;

    let cartlist = await cartModel.find({ user });

    if (cartlist.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cart is empty. Please add items to cart before placing an order.",
      });
    }

    let order = new orderModel({
      user,
      address,
      city,
      phone,
      orderstatus,
      paymentmethod,
      deliverycharge,
      discount,
      items: cartlist,
      totalprice: cartlist.reduce((total, item) => total + item.totalPrice, 0),
    });

    await order
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Order placed successfully",
          data: order,
        });
      })
      .catch(() => {
        return res.status(400).json({
          success: false,
          message: "Failed to place order",
        });
      });

    let deletecart = await cartModel.deleteMany({ user: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Internal Server Error",
      error: error.message,
    });
  }
};

const getallordersControllers = async (req, res) => {
  try {
    let orders = await orderModel
      .find({})
      .populate({ path: "user", select: "name email -_id" })
      .populate({
        path: "items.product",
        select: "title image price discountprice -_id",
      })
      .populate({ path: "items.variants", select: "size color stock -_id" });
    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

module.exports = {
  ordereControllers,
  getallordersControllers,
};
