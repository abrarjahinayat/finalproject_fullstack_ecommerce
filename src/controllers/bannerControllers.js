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

module.exports = addbannerControllers;
