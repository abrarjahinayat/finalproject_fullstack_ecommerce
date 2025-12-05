const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");

const addtocartControllers = async (req, res) => {
  try {
    let { user, product, variants, quantity } = req.body;

    let productinfo = await productModel.findById(product);
    let cartinfo = await cartModel.findOne({ product });

    let totalPrice =
      productinfo.price > 0
        ? productinfo.price * quantity
        : productinfo.originalPrice * quantity;

    if (cartinfo) {
      return res.status(400).json({
        success: false,
        message: "Product already in cart",
      });
    } else {
      if (productinfo.variantType === "MultiVarient") {
        if (!variants) {
          return res.status(400).json({
            success: false,
            message: "Please select variant for multi-variant product",
          });
        } else {
          let addCart = new cartModel({
            user,
            product,
            quantity,
            totalPrice,
            variants,
          });
          await addCart.save();
          return res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            data: addCart,
          });
        }
      } else {
        let addCart = new cartModel({
          user,
          product,
          quantity,
          totalPrice,
        });
        await addCart.save();
        return res.status(201).json({
          success: true,
          message: "Product added to cart successfully",
          data: addCart,
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

const getcartControllers = async (req, res) => {
  try {
    let cartData = await cartModel
      .find({})
      .populate({
        path: "user",
        select: "name email -_id",
      })
      .populate({
        path: "product",
        select: "title stock image price discountprice -_id",
      })
      .populate({
        path: "variants",
        select: "size color stock -_id",
      });
    return res.status(200).json({
      success: true,
      message: "Cart data fetched successfully",
      data: cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Internal Server Error",
      error: error.message,
    });
  }
};

const getSinglecartControllers = async (req, res) => {
  try {
    let { id } = req.params;
    let singlecartData = await cartModel
      .find({ user: id })
      .select("-user  -createdAt -updatedAt")
      .populate({
        path: "product",
        select: "title image price discountprice _id",
      })
      .populate({
        path: "variants",
        select: "size color _id",
      });
    return res.status(200).json({
      success: true,
      message: "Single cart data fetched successfully",
      data: singlecartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Internal Server Error",
      error: error.message,
    });
  }
};

const updatecartControllers = async (req, res) => {
  try {
    let { id } = req.params;
    let { quantity } = req.body;

    let productinfoData = await productModel.findOne({ _id: id });
    
    let totalPrice =
      productinfoData.price > 0
        ? productinfoData.price * quantity
        : productinfoData.originalPrice * quantity;
    let productinfo = await cartModel.findOneAndUpdate(
      { product: id },
      { quantity, totalPrice },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: productinfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Internal Server Error",
      error: error.message,
    });
  }
};


const deletecartControllers = async (req, res) => {
  try {
    let { id } = req.params;
    let deletecart = await cartModel.findOneAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      data: deletecart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addtocartControllers,
  getcartControllers,
  getSinglecartControllers,
  updatecartControllers,
  deletecartControllers,
};
