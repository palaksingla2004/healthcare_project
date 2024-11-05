const mongoose = require("mongoose");

const userSchema=mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please add your name"],
        },
        phoneNumber: {
            type: String,
            require: [true, "Please input Phone No."]
        },
        password: {
            type: String,
            require: [true, "Please enter password,."]
        },
        email: {
            type: String,
            require: [true, "Please enter email"]
        }
    },
    {

        timestamps: true,
    }
);
const User= mongoose.model("User",userSchema);
module.exports=User;