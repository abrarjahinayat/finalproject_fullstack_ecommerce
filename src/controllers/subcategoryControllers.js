const slugify = require("slugify");
const subcategoryModel = require("../model/subcategory.model");
const categoryModel = require("../model/category.model");
const subCategoryControllers = async (req, res) => {
  try {
    let { name, category } = req.body;

    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let addsubcategory = new subcategoryModel({
      name,
      slug,
        category,
    });

    let updatecategory = await categoryModel.findOneAndUpdate(
      { _id: category },
      { $push: { subcategory: addsubcategory._id } }
    );
    await updatecategory.save();

    await addsubcategory.save();

    return res.status(201).json({
      success: true,
      message: "SubCategory added successfully",
      data: addsubcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

module.exports = { subCategoryControllers };
