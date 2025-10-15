const categoryModel = require("../model/category.model");

// Add Category Controller
const addcategoryControllers = async (req, res) => {
  try {
    let { filename } = req.file;
    let { name } = req.body;

    let addcategory = await new categoryModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      name,
    });
    await addcategory.save();
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: addcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
    
  }
};

// Delete Category Controller
const deletecategoryControllers = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedCategory = await categoryModel.findByIdAndDelete({ _id: id });
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

module.exports = { addcategoryControllers, deletecategoryControllers };
