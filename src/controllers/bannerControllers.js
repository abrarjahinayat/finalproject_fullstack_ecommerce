const bannerModel = require("../model/banner.model");

const addbannerControllers = async (req, res) => {
  let { link } = req.body;
  let {  filename } = req.file;
  console.log(filename);
  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${ filename}`,
      link,
    });
    await banner.save();

    return res
      .status(201)
      .json({ success: true, message: "Banner added successfully", data: banner });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message || error });
  }
};


const deletebannerControllers = async (req, res) => {
  let { id } = req.params;
  try {
    let deletedBanner = await bannerModel.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    return res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message || error });
  }
}

module.exports = {  addbannerControllers, deletebannerControllers };
