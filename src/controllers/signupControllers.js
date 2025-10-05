const userModel = require("../model/signup.model");
const randomnumber = require("../utils/otp");
const sendEmail = require("../utils/send_email");

const signupControllers = async (req, res, next) => {
  const otp = randomnumber();

  let { name, email, password, phone, role, image } = req.body;
  let user = new userModel({
    name,
    email,
    password,
    phone,
    role,
    image,
    otp,
  });

  await user
    .save()
    .then(() => {
      sendEmail(email, otp);

      setTimeout(async () => {
      let otpremove =  await userModel.findOneAndUpdate({email}, {otp: null}, {new: true});

      await otpremove.save().then(()=>{
        console.log("otp removed successfully");
      }).catch((err) => next(err));
      }, 60000);

      return res.status(201).json({
        success: true,
        message: "user signup successfully",
        data: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const verifyOtpControllers = async(req, res, next) => {
  let {email, otp} = req.body;

  let user = await userModel.findOne({email});

  if(!user){
    return res.status(404).json({
      success: false,
      message: "user not found",
    })
  }else{
     if(user.otp === otp){
      let verifyuser = await userModel.findOneAndUpdate({email}, {verify :true, otp: null}, {new: true});
      return res.status(200).json({
        success: true,
        message: "user verified successfully",
        data: verifyuser,
      });
     }else{
      return res.status(404).json({
        success: false,
        message: "Invalid OTP",
      })
     }
    }
};

module.exports = { signupControllers, verifyOtpControllers };
