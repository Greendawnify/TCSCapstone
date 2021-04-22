let mongoose = require("mongoose");
mongoose.Promise = global.Promise;      // creating reference. 

let UserSchema = mongoose.Schema({
    uId: Number,
    isLocked: Boolean,
    loginTries: Number,
    fName: String,
    lName: String,
    email: String,
    pWord: String,
    dob: String, // Change to Date type
    phoneNum: Number,
    street:String,
    city: String,
    state: String,
    zip: Number,
    funds:Number,
    actNum: Number,
    balance: Number,
    Orders:[
        {
            _id: Number,
            name: String,
            quantity: Number
        }
    ]
})

let UserModel = mongoose.model("",UserSchema,"User");

module.exports = UserModel;