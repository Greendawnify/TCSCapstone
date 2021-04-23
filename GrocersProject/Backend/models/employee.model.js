let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let EmployeeSchema = mongoose.Schema ({
    _id:Number,
    password:String,
    firstname:String,
    lastname:String,
    emailid:String,
    resetpwd:String = 1,
    orders_status:[{
        oId:Number,
        shipped:Boolean,
        outdelivery:Boolean,
        delivered:{type: Date, default: Date.now},
        cancelled:Boolean
    }]
})
let EmployeeModel= mongoose.model("", EmployeeSchema, "Employee");

//module.exports = ProductModel; one model only below more than one
module.exports = EmployeeModel;