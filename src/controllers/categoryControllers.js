const categoryModel = require("../model/category.model");
const fs = require("fs");
const path = require("path");

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
    let categorypath = path.join(__dirname, `../../uploads/`);
    let deletedCategory = await categoryModel.findByIdAndDelete({ _id: id });
    let imageurl = deletedCategory.image.split("/");
    fs.unlink(`${categorypath}/${imageurl[imageurl.length - 1]}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    })
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

// Get All Category Controller
const getallcategoryControllers = async (req, res) => {
    try {
        let allcategory = await categoryModel.find({});
        return res.status(200).json({
            success: true,
            message: "All Category fetched successfully",
            data: allcategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || error,
          });
    }
}
module.exports = { addcategoryControllers, deletecategoryControllers, getallcategoryControllers };
