
let UserModel = require("../models/user.model.js");

//Retrieve all user details 
let getUserDetails =(req,res)=> {

    UserModel.find({},(err,result)=> {
        if(!err){
            res.json(result);
        }
    })

}

/* let getUserById = (req,res)=> {
    
    let pid = req.params.pid;       //passing id through path param 
    
    UserModel.find({_id:pid},(err,data)=> {
        if(!err){
            res.json(data);         // return array 
            //res.json(data[0])     // return only one object 
        }
    })
} */

let storeUserDetails = (req,res)=> {
    let user = new UserModel({
        uId: Math.floor(Math.random() * 99999),
        isLocked: false,
        loginTries: 3,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        pWord: req.body.pWord,
        dob: req.body.dob,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        funds: 100,
        actNum: req.body.actNum,
        balance: 10000,
        Orders:[
            {
                _id: "",
                name: "",
                quantity: 0
            }
        ]
    });

    user.save((err,result)=> {
        if(!err){
            res.send("Record stored successfully ")
            //res.json({"msg":"Record stored successfully"})
        }else {
            res.send("Record didn't store ");
        }
    })

}

/* let deleteProductById= (req,res)=> {
    let pid = req.params.pid;
    UserModel.deleteOne({_id:pid},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                    res.send("Record deleted successfully")
                }else {
                    res.send("Record not present");
                }
        }else {
            res.send("Error generated "+err);
        }
    })

}

let updateProductPrice= (req,res)=> {
    let pid = req.body.pid;
    let updatedPrice = req.body.price;
    UserModel.updateMany({_id:pid},{$set:{price:updatedPrice}},(err,result)=> {
        if(!err){
            if(result.nModified>0){
                    res.send("Record updated succesfully")
            }else {
                    res.send("Record is not available");
            }
        }else {
            res.send("Error generated "+err);
        }
    })

} */

//module.exports={getProductDetails,getProductById,storeProductDetails,deleteProductById,updateProductPrice}

module.exports = {getUserDetails, storeUserDetails};