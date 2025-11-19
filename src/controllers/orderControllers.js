const cartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");

const SSLCommerzPayment = require("sslcommerz-lts");
const randomnumber = require("../utils/otp");
const store_id = process.env.STORE_ID || "<your_store_id>";
const store_passwd = process.env.STORE_PASSWORD || "<your_store_password>";
const is_live = false; //true for live, false for sandbox

const ordereControllers = async (req, res) => {
  try {
    const otp = randomnumber();
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
    } else {
      if (paymentmethod === "cod") {
        let totalprice = cartlist.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
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
          totalprice: totalprice,
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
      }
      
      else {
        let totalprice = cartlist.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
          let tran_id = `TRNX${otp}`;
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
          totalprice: totalprice,
          transactionId : tran_id
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
      
        // Online Payment Integration with SSLCommerz
        const data = {
          total_amount: totalprice,
          currency: "BDT",
          tran_id: tran_id , // use unique tran_id for each api call
          success_url: `http://localhost:3000/api/v1/order/success/${tran_id}`,
          fail_url: `http://localhost:3000/api/v1/order/fail/${tran_id}`,
          cancel_url: "http://localhost:3030/cancel",
          ipn_url: "http://localhost:3030/ipn",
          shipping_method: "Courier",
          product_name: "Computer.",
          product_category: "Electronic",
          product_profile: "general",
          cus_name: "Customer Name",
          cus_email: "customer@example.com",
          cus_add1: "Dhaka",
          cus_add2: "Dhaka",
          cus_city: "Dhaka",
          cus_state: "Dhaka",
          cus_postcode: "1000",
          cus_country: "Bangladesh",
          cus_phone: phone,
          cus_fax: "01711111111",
          ship_name: "Customer Name",
          ship_add1: address,
          ship_add2: "Dhaka",
          ship_city: city,
          ship_state: "Dhaka",
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
          // Redirect the user to payment gateway
          let GatewayPageURL = apiResponse.GatewayPageURL;
          // res.redirect(GatewayPageURL);
          console.log("Redirecting to: ", GatewayPageURL);
        });
      }
    }
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


const odersuccessControllers = async (req, res) => {
  let { id } = req.params;
    let order = await orderModel.findOneAndUpdate({ transactionId: id } , { paid: "paid" }, { new: true });
    return res.status(200).json({
      success: true,
      message: "Payment successful and order updated",
      data: order,
    });
};


const orderfailControllers = async (req, res) => {
  // Implementation for order failure
  let{ id } = req.params;
    let order = await orderModel.findOneAndUpdate({ transactionId: id } , { paid: "unpaid" }, { new: true });
    return res.status(200).json({
      success: true,
      message: "Payment failed and order updated",
      data: order,
    });
};

const ordercancelControllers = async (req, res) => {
  // Implementation for order cancellation
};
module.exports = {
  ordereControllers,
  getallordersControllers,
  odersuccessControllers,
  orderfailControllers,
  ordercancelControllers,
};
