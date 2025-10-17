const { default: mongoose } = require("mongoose");
const SubcategorySchema = new mongoose.Schema(
  {
    name:{
        type: String,
        required: [true, "name is required"],
        unique: true,
    },
    slug: {
      type: String,
    },
   
  },
  { timestamps: true }
);





module.exports = mongoose.model("SubCategory", SubcategorySchema);
