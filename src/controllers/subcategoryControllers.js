const slugify = require("slugify");
const subcategoryModel = require("../model/subcategory.model");
const subCategoryControllers = async (req, res) => {
    try {

        let { name } = req.body;

        let slug = slugify(name, {
            replacement: "-",
            remove: undefined,
            lower: true,
            trim: true,
        });

        let subcategory = new  subcategoryModel({
            name,
            slug,
        });
        await subcategory.save();
        return res.status(201).json({
            success: true,
            message: "SubCategory added successfully",
            data: subcategory,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || error,
        });
    }
}

module.exports = {subCategoryControllers};