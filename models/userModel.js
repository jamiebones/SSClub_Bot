const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: String,
        birthDay: String, //format => day-month 
    }
);

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = { UserModel };
