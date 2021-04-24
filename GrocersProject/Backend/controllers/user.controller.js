
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
                id: "",
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
            res.send(err + " Record didn't store ");
        }
    })

}

let signInUser = (req,res)=> {
    
    let uEmail = req.body.email;       //passing id through path param 
    let uPassword = req.body.pWord;
    
    // Looking for the user through email
    UserModel.find({email:uEmail},(err,data)=> {
        if(!err){
            
            // If no initial err, then check if the user input email is found
            // If not found then user does not exist, no need to lock the 
            // potential user out
            if(data.length == 0){
                res.send("Email not found: " + data);
            }

            // If the email id exists in the db, then proceed to check the inputed
            // password
            else{
                // Looking for the user inputed password
                UserModel.find({pWord:uPassword}, (errP, dataP) =>{

                    if(!errP){
                        
                        // If the password is not found, then the user probably input
                        // the password wrong, three trials begin for the user with the
                        // correct email id 
                        if(dataP.length == 0){   
                            // Check if the user with the inputed email id is locked out if not and the
                            // inputed password is incorrect, then decrement their number of tries
                            // if the number of tries associated with the email id reaches 0, then lock that account
                            if(data[0].isLocked == false){
                                if(data[0].loginTries > 0){
                                    res.send("Incorrect Password! " + data[0].loginTries + " tries left!");
                                    let tempLoginTries = data[0].loginTries;
                                    tempLoginTries--;
                                    UserModel.updateOne({email:uEmail}, {$set:{loginTries:tempLoginTries}}, (err, result)=>{});
                                }
                                else{
                                    res.send("Your number of tries depleted. You are locked out! Raise ticket!");
                                    UserModel.updateOne({email:uEmail}, {$set:{isLocked:true}}, (err, result)=>{});
                                }
                            }
                            else{
                                res.send("You are locked out! Raise ticket!");
                            }
                        }

                        // User input correct credentials, proceed forward
                        else{

                            // Reset the user's number of tries, once they login correctly
                            UserModel.updateOne({email:uEmail}, {$set:{loginTries:3}}, (err, result)=>{});
                            res.json("Data is: " + dataP);
                        }      
                    }
                    else{
                        res.send("Finding Error: " + err);
                    }
                })
                //res.send("Data is: " + data);
            }
        }
        else{
            res.send("Finding Error: " + err);
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

module.exports = {getUserDetails, storeUserDetails, signInUser};