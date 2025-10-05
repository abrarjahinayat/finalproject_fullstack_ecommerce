const userModel = require("../model/signup.model");
const sendEmail = require("../utils/send_email");

const signupControllers = async (req, res , next) => {

  let { name, email, password, phone, role, image } = req.body;
  let user = new userModel({
    name,
    email,
    password,
    phone,
    role,
    image,
  });

  await user.save().then(() => {
     sendEmail(email).then(() => console.log("email send successfully")).catch((err) => console.log(err.message));
      return res.status(201).json({
        success: true,
        message: "user signup successfully",
        data: user,
      });

  }).catch((err) => {
        next(err);
  });
};

module.exports = { signupControllers };
