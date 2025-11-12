const { default: mongoose } = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
    },
    city:{
        type: String,
        required: [true, "City is required"],
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
    },
    deliverycharge:{
        type: String,
        enum:["outsidedhaka","insideDhaka"],
        default:"outsidedhaka",
    },
    paymentmethod:{
        type: String,
        enum:["cod","online"],
        default:"cod",
    },
    status:{
        type: String,
        enum:["pending","confirmed","delivered"],
        default:"pending",
    },
    items:{
        product:{
            type: mongoose.Types.ObjectId,
            ref: "Products",
        },
        variants:{
            type: mongoose.Types.ObjectId,
            ref: "Variant",
        },
        quantity:{
            type: Number,
            default:1
        }
    },
    discount:{
        type: Number,
        default:0
    },
    totalprice:{
        type: Number,

},
transactionId:{
    type: String
},
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);